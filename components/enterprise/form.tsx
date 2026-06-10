'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { trackLead } from '@/components/analytics/pixel-events'
import { trackFormStart, trackFormSubmit } from '@/lib/analytics'

const UF_LIST = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function EnterpriseForm() {
  const formStartedRef = useRef(false)
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', cargo: '', empresa: '', uf: '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.nome.trim()) e.nome = 'Obrigatório'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.telefone.trim()) e.telefone = 'Obrigatório'
    if (!form.cargo.trim()) e.cargo = 'Obrigatório'
    if (!form.empresa.trim()) e.empresa = 'Obrigatório'
    if (!form.uf) e.uf = 'Obrigatório'
    return e
  }

  function markFormStart() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackFormStart({ form_name: 'enterprise_lead', form_location: 'enterprise_page' })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    markFormStart()
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof form]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function formatPhone(value: string) {
    const d = value.replace(/\D/g, '').slice(0, 11)
    if (d.length <= 2) return d
    if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`
    return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    markFormStart()
    setForm(prev => ({ ...prev, telefone: formatPhone(e.target.value) }))
    if (errors.telefone) setErrors(prev => ({ ...prev, telefone: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setFormState('submitting')
    await new Promise(r => setTimeout(r, 1200))
    trackFormSubmit({
      form_name: 'enterprise_lead',
      form_destination: 'enterprise_sales',
      form_location: 'enterprise_page',
    })
    trackLead('enterprise_form')
    setFormState('success')
  }

  if (formState === 'success') {
    return (
      <div className="py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-pale-green border border-hairline flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="type-title-lg text-ink mb-3">Solicitação recebida.</h3>
        <p className="type-body-sm text-body-muted max-w-sm mx-auto">
          Um especialista Juspilot entrará em contato em até 1 dia útil para agendar a apresentação.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nome completo" error={errors.nome}>
          <input name="nome" value={form.nome} onChange={handleChange}
            placeholder="Ana Souza" className={input(!!errors.nome)} autoComplete="name" />
        </Field>
        <Field label="E-mail corporativo" error={errors.email}>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="ana@empresa.com.br" className={input(!!errors.email)} autoComplete="email" />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Telefone" error={errors.telefone}>
          <input name="telefone" value={form.telefone} onChange={handlePhone}
            placeholder="(11) 99999-9999" className={input(!!errors.telefone)} inputMode="tel" />
        </Field>
        <Field label="Cargo" error={errors.cargo}>
          <input name="cargo" value={form.cargo} onChange={handleChange}
            placeholder="General Counsel" className={input(!!errors.cargo)} />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Empresa" error={errors.empresa}>
          <input name="empresa" value={form.empresa} onChange={handleChange}
            placeholder="Nome da empresa" className={input(!!errors.empresa)} autoComplete="organization" />
        </Field>
        <Field label="Estado (UF)" error={errors.uf}>
          <select name="uf" value={form.uf} onChange={handleChange}
            className={cn(input(!!errors.uf), 'appearance-none cursor-pointer')}>
            <option value="" disabled>Selecione</option>
            {UF_LIST.map(uf => <option key={uf} value={uf}>{uf}</option>)}
          </select>
        </Field>
      </div>
      <Button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full mt-2"
      >
        {formState === 'submitting' ? 'Enviando...' : 'Solicitar apresentação →'}
      </Button>
      <p className="type-caption text-slate text-center">
        Seus dados são tratados com confidencialidade, em conformidade com a LGPD.
      </p>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="type-caption text-body-muted">{label}</label>
      {children}
      {error && <span className="text-[10px] text-error">{error}</span>}
    </div>
  )
}

function input(hasError: boolean) {
  return cn(
    'w-full px-4 py-3 rounded-md text-sm text-ink bg-canvas border transition-all duration-200 outline-none placeholder:text-muted',
    'focus:border-brand focus:[box-shadow:var(--shadow-focus-ring)]',
    hasError ? 'border-error' : 'border-hairline',
  )
}

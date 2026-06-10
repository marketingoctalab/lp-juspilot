'use client'

import { useState, useEffect, useRef } from 'react'
import { trackLead } from '@/components/analytics/pixel-events'
import { trackFormStart, trackFormSubmit } from '@/lib/analytics'
import { submitLead } from '@/lib/leads'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LeadSuccessPanel } from '@/components/lead-success-panel'
import type { Locale, Translations } from '@/lib/i18n'

const CARGO_LIST = [
  'General Counsel (GC)',
  'Diretor(a) Jurídico(a)',
  'Gerente Jurídico(a)',
  'Advogado(a) Sênior',
  'Advogado(a) Pleno(a)',
  'Advogado(a) Júnior',
  'Coordenador(a) Jurídico(a)',
  'Analista Jurídico(a)',
  'Paralegal',
  'Sócio(a) de Escritório',
  'Of Counsel',
  'Compliance Officer',
  'DPO (Data Protection Officer)',
  'CEO / Fundador(a)',
  'COO / Diretor(a) de Operações',
  'CFO / Diretor(a) Financeiro(a)',
  'Outro',
]

const UF_LIST = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
]

interface ContactModalProps {
  open: boolean
  onClose: () => void
  locale?: Locale
  leadSource?: string
  t?: Translations['modal']
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const DEFAULT_T: Translations['modal'] = {
  title: 'Agendar conversa com especialista',
  subtitle: 'Nossa equipe entra em contato em até 1 dia útil.',
  close: 'Fechar',
  success: {
    title: 'Recebemos sua solicitação.',
    body: 'Escolha como prefere continuar: agende uma demonstração com nosso time ou acesse a plataforma agora.',
    demoCta: 'Agendar demonstração no WhatsApp',
    loginCta: 'Fazer login e testar agora',
    close: 'Fechar',
  },
  fields: {
    name: 'Nome completo',
    email: 'E-mail corporativo',
    phone: 'Telefone',
    role: 'Cargo',
    company: 'Empresa',
    state: 'Estado (UF)',
    rolePlaceholder: 'Selecione seu cargo',
    statePlaceholder: 'Selecione',
    namePlaceholder: 'Ana Souza',
    emailPlaceholder: 'ana@empresa.com.br',
    phonePlaceholder: '(11) 99999-9999',
    companyPlaceholder: 'Nome da empresa',
  },
  submit: 'Solicitar conversa com especialista',
  submitting: 'Enviando...',
  lgpd: 'Seus dados são tratados com confidencialidade, em conformidade com a LGPD.',
}

export function ContactModal({
  open,
  onClose,
  locale = 'pt',
  leadSource = 'contact_modal',
  t = DEFAULT_T,
}: ContactModalProps) {
  const formStartedRef = useRef(false)
  const [formState, setFormState] = useState<FormState>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    empresa: '',
    uf: '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.nome.trim()) e.nome = locale === 'en' ? 'Required' : 'Obrigatório'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = locale === 'en' ? 'Invalid email' : 'E-mail inválido'
    if (!form.telefone.trim()) e.telefone = locale === 'en' ? 'Required' : 'Obrigatório'
    if (!form.cargo.trim()) e.cargo = locale === 'en' ? 'Required' : 'Obrigatório'
    if (!form.empresa.trim()) e.empresa = locale === 'en' ? 'Required' : 'Obrigatório'
    if (!form.uf) e.uf = locale === 'en' ? 'Required' : 'Obrigatório'
    return e
  }

  function markFormStart() {
    if (formStartedRef.current) return
    formStartedRef.current = true
    trackFormStart({ form_name: 'contact_modal', form_location: 'contact_modal' })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    markFormStart()
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof form]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`
    if (digits.length <= 11) return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
    return value
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    markFormStart()
    setForm(prev => ({ ...prev, telefone: formatPhone(e.target.value) }))
    if (errors.telefone) setErrors(prev => ({ ...prev, telefone: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setFormState('submitting')
    setSubmitError(null)

    try {
      await submitLead({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cargo: form.cargo,
        empresa: form.empresa,
        uf: form.uf,
        locale,
        form_name: 'contact_modal',
        lead_source: leadSource,
      })
      trackFormSubmit({
        form_name: 'contact_modal',
        form_destination: 'supabase',
        form_location: leadSource,
      })
      trackLead(leadSource)
      setFormState('success')
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Não foi possível enviar o formulário.',
      )
      setFormState('error')
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setFormState('idle')
      formStartedRef.current = false
      setSubmitError(null)
      setForm({ nome: '', email: '', telefone: '', cargo: '', empresa: '', uf: '' })
      setErrors({})
    }, 300)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto bg-canvas border border-hairline rounded-t-2xl sm:rounded-xl shadow-soft-lift safe-bottom">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-hairline">
          <div>
            <h2 id="modal-title" className="type-title-lg text-ink">
              {t.title}
            </h2>
            <p className="type-caption text-slate mt-1">{t.subtitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-slate hover:text-ink transition-colors ml-4 mt-0.5 shrink-0"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {formState === 'success' ? (
            <LeadSuccessPanel
              compact
              title={t.success.title}
              body={t.success.body}
              demoLabel={t.success.demoCta}
              loginLabel={t.success.loginCta}
              closeLabel={t.success.close}
              onClose={handleClose}
            />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={t.fields.name} error={errors.nome}>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder={t.fields.namePlaceholder}
                    className={inputClass(!!errors.nome)}
                    autoComplete="name"
                  />
                </Field>
                <Field label={t.fields.email} error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.fields.emailPlaceholder}
                    className={inputClass(!!errors.email)}
                    autoComplete="email"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={t.fields.phone} error={errors.telefone}>
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handlePhone}
                    placeholder={t.fields.phonePlaceholder}
                    className={inputClass(!!errors.telefone)}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </Field>
                <Field label={t.fields.role} error={errors.cargo}>
                  <select
                    name="cargo"
                    value={form.cargo}
                    onChange={handleChange}
                    className={cn(inputClass(!!errors.cargo), 'appearance-none cursor-pointer')}
                  >
                    <option value="" disabled>{t.fields.rolePlaceholder}</option>
                    {CARGO_LIST.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label={t.fields.company} error={errors.empresa}>
                  <input
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder={t.fields.companyPlaceholder}
                    className={inputClass(!!errors.empresa)}
                    autoComplete="organization"
                  />
                </Field>
                <Field label={t.fields.state} error={errors.uf}>
                  <select
                    name="uf"
                    value={form.uf}
                    onChange={handleChange}
                    className={cn(inputClass(!!errors.uf), 'appearance-none cursor-pointer')}
                  >
                    <option value="" disabled>{t.fields.statePlaceholder}</option>
                    {UF_LIST.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {submitError ? (
                <p className="type-caption text-error text-center">{submitError}</p>
              ) : null}
              <Button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full mt-2"
              >
                {formState === 'submitting' ? t.submitting : `${t.submit} →`}
              </Button>

              <p className="type-caption text-slate text-center">{t.lgpd}</p>
            </form>
          )}
        </div>
      </div>
    </div>
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

function inputClass(hasError: boolean) {
  return cn(
    'w-full px-3 py-2.5 rounded-md text-sm text-ink bg-canvas border transition-all duration-200 outline-none placeholder:text-muted',
    'focus:border-brand focus:[box-shadow:var(--shadow-focus-ring)]',
    hasError ? 'border-error' : 'border-hairline',
  )
}

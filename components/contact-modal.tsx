'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [formState, setFormState] = useState<FormState>('idle')
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
    if (!form.nome.trim()) e.nome = 'Obrigatório'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.telefone.trim()) e.telefone = 'Obrigatório'
    if (!form.cargo.trim()) e.cargo = 'Obrigatório'
    if (!form.empresa.trim()) e.empresa = 'Obrigatório'
    if (!form.uf) e.uf = 'Obrigatório'
    return e
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
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
    // Aqui você conecta ao seu backend / CRM
    await new Promise(r => setTimeout(r, 1200))
    setFormState('success')
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setFormState('idle')
      setForm({ nome: '', email: '', telefone: '', cargo: '', empresa: '', uf: '' })
      setErrors({})
    }, 300)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0F1014] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/5">
          <div>
            <h2 id="modal-title" className="font-serif text-xl md:text-2xl font-medium text-white">
              Agendar conversa com especialista
            </h2>
            <p className="text-xs text-[#A7ABB3] mt-1">
              Nossa equipe entra em contato em até 1 dia útil.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-[#A7ABB3] hover:text-white transition-colors ml-4 mt-0.5 shrink-0"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {formState === 'success' ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-lg text-white mb-2">Recebemos sua solicitação.</h3>
              <p className="text-sm text-[#A7ABB3] max-w-xs mx-auto">
                Um especialista Juspilot entrará em contato em até 1 dia útil para agendar a conversa.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 text-xs text-[#A7ABB3] underline underline-offset-4 hover:text-white transition-colors"
              >
                Fechar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nome completo" error={errors.nome}>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Ana Souza"
                    className={inputClass(!!errors.nome)}
                    autoComplete="name"
                  />
                </Field>
                <Field label="E-mail corporativo" error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ana@empresa.com.br"
                    className={inputClass(!!errors.email)}
                    autoComplete="email"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Telefone" error={errors.telefone}>
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={handlePhone}
                    placeholder="(11) 99999-9999"
                    className={inputClass(!!errors.telefone)}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </Field>
                <Field label="Cargo" error={errors.cargo}>
                  <select
                    name="cargo"
                    value={form.cargo}
                    onChange={handleChange}
                    className={cn(inputClass(!!errors.cargo), 'appearance-none cursor-pointer')}
                  >
                    <option value="" disabled>Selecione seu cargo</option>
                    {CARGO_LIST.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Empresa" error={errors.empresa}>
                  <input
                    name="empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className={inputClass(!!errors.empresa)}
                    autoComplete="organization"
                  />
                </Field>
                <Field label="Estado (UF)" error={errors.uf}>
                  <select
                    name="uf"
                    value={form.uf}
                    onChange={handleChange}
                    className={cn(inputClass(!!errors.uf), 'appearance-none cursor-pointer')}
                  >
                    <option value="" disabled>Selecione</option>
                    {UF_LIST.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full mt-2 px-6 py-3 rounded-xl text-sm font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? 'Enviando...' : 'Solicitar conversa com especialista →'}
              </button>

              <p className="text-[10px] text-[#A7ABB3] text-center">
                Seus dados são tratados com confidencialidade, em conformidade com a LGPD.
              </p>
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
      <label className="text-xs text-[#A7ABB3] font-medium">{label}</label>
      {children}
      {error && <span className="text-[10px] text-red-400">{error}</span>}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full px-3 py-2.5 rounded-lg text-sm text-white bg-white/5 border transition-all duration-200 outline-none placeholder-[#6B7280]',
    'focus:bg-white/8 focus:border-white/30 focus:ring-1 focus:ring-white/10',
    hasError ? 'border-red-400/50' : 'border-white/10'
  )
}

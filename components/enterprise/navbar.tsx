'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

export function EnterpriseNavbar() {
  function scrollToForm() {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-10">
        <Link href="/enterprise" aria-label="Juspilot Enterprise">
          <Logo size="sm" variant="light" />
        </Link>
        <button
          onClick={scrollToForm}
          className="text-xs md:text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg px-3 py-2 md:px-4 transition-all duration-200 whitespace-nowrap"
        >
          Falar com especialista →
        </button>
      </nav>
    </header>
  )
}

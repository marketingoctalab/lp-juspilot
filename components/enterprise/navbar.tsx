'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function EnterpriseNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToForm() {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-[background,border-color,backdrop-filter] duration-200',
        isScrolled
          ? 'bg-page/85 backdrop-blur-md border-b border-hairline'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-8">
        <Link href="/enterprise" aria-label="Juspilot Enterprise">
          <Logo size="sm" variant="dark" />
        </Link>
        <Button size="sm" variant="secondary" onClick={scrollToForm}>
          Falar com especialista →
        </Button>
      </nav>
    </header>
  )
}

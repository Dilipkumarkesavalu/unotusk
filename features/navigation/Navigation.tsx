'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ElephantMark } from '@/components/ElephantMark'
import { SITE } from '@/lib/constants'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/[0.05] bg-[#090D17]/80 backdrop-blur-md'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 md:py-6"
        aria-label="Main navigation"
      >
        {/* Left: logo + wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
          aria-label={SITE.name}
        >
          <ElephantMark
            size={26}
            className="text-[#F5F3EF] transition-colors duration-300 group-hover:text-[#CBC1B5]"
          />
          <span
            className="font-[var(--font-inter)] text-[15px] font-medium tracking-[0.12em] text-[#F5F3EF] uppercase transition-colors duration-300 group-hover:text-[#CBC1B5]"
          >
            {SITE.name}
          </span>
        </Link>

        {/* Right: CTA */}
        <Link
          href="#early-access"
          className={[
            'group flex items-center gap-1.5 text-[13px] tracking-wide',
            'text-[#CBC1B5] transition-colors duration-300',
            'hover:text-[#F5F3EF]',
          ].join(' ')}
        >
          <span>Join Lighthouse</span>
          <span
            className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </nav>
    </header>
  )
}

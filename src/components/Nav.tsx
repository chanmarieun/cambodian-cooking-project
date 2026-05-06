'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const leftLinks = [
  { href: '/events', label: 'Calendar' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/blog', label: 'Blog' },
]

const rightLinks = [
  { href: '/pantry', label: 'Pantry' },
  { href: '/supporting', label: 'Supporting Khmer Businesses' },
  { href: '/about', label: 'About' },
]

const allLinks = [...leftLinks, ...rightLinks]

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showLogo = !isHome || scrolled

  return (
    <>
      <header
        className="w-full px-8 py-6 bg-white"
        style={isHome ? { position: 'sticky', top: 0, zIndex: 40 } : undefined}
      >
        {/* Desktop */}
        <nav className="hidden md:grid w-full items-center" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
          {/* Left links */}
          <div className="flex items-center gap-8">
            {leftLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] uppercase tracking-widest hover:opacity-50 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div
            className="flex justify-center"
            style={{
              opacity: showLogo ? 1 : 0,
              transform: showLogo ? 'translateY(0)' : 'translateY(-8px)',
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              pointerEvents: showLogo ? 'auto' : 'none',
            }}
          >
            <Link href="/">
              <Image
                src="/logo/hella-logo.png"
                alt="Cambodian Cooking Collective"
                width={90}
                height={40}
                className="object-contain"
                style={{ height: '32px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Right links */}
          <div className="flex items-center gap-8 justify-end">
            {rightLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] uppercase tracking-widest hover:opacity-50 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between">
          <Link href="/" style={{ opacity: showLogo ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: showLogo ? 'auto' : 'none' }}>
            <Image
              src="/logo/hella-logo.png"
              alt="Cambodian Cooking Collective"
              width={70}
              height={30}
              className="object-contain"
              style={{ height: '24px', width: 'auto' }}
            />
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="text-xs uppercase tracking-widest"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/20 z-50" onClick={() => setOpen(false)} />
      )}

      {/* Mobile slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 flex flex-col px-8 py-10 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="self-start mb-10 text-xs uppercase tracking-widest"
          aria-label="Close menu"
        >
          Close
        </button>
        <nav className="flex flex-col gap-6">
          {allLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-widest hover:opacity-50 transition-opacity"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

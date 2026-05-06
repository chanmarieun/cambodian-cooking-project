'use client'

import { useState, useEffect } from 'react'
import Preloader from '@/components/Preloader'
import KhmerWordSection from '@/components/KhmerWordSection'
import MissionSection from '@/components/MissionSection'

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 250, 1)
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Hero */}
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          minHeight: 'calc(100vh - 80px)',
          position: 'sticky',
          top: 0,
          zIndex: 0,
          opacity: preloaderDone ? Math.max(1 - scrollProgress * 1.5, 0) : 0,
          transform: `translateY(${-scrollProgress * 50}px)`,
          transition: preloaderDone ? 'opacity 0.5s ease 0.1s' : 'none',
        }}
      >
        <div className="text-center">
          <p className="font-bold uppercase" style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '0.05em' }}>
            HELLA
            <br />
            <span style={{ fontWeight: 900, WebkitTextStroke: '1.5px black' }}>ឆ្ងាញ់</span>
          </p>
          <p className="mt-6 text-[13px] uppercase tracking-[0.3em]">
            Cambodian Cooking Collective
          </p>
        </div>

        {/* Social icons — bottom right */}
        <div className="absolute bottom-8 right-8 flex items-center gap-5">
          {/* Email */}
          <a href="mailto:hello@cambodiancookingcollective.com" aria-label="Email" className="opacity-40 hover:opacity-100 transition-opacity">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-40 hover:opacity-100 transition-opacity">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="opacity-40 hover:opacity-100 transition-opacity">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="opacity-40 hover:opacity-100 transition-opacity">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="relative bg-black" style={{ zIndex: 1, position: 'sticky', top: 0 }}>
        <KhmerWordSection />
      </div>

      {/* Mission section */}
      <MissionSection />
    </>
  )
}

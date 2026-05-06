'use client'

import { useState, useEffect } from 'react'
import Preloader from '@/components/Preloader'

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
        className="flex flex-col items-center justify-center"
        style={{
          minHeight: 'calc(100vh - 80px)',
          opacity: preloaderDone ? Math.max(1 - scrollProgress * 1.5, 0) : 0,
          transform: `translateY(${-scrollProgress * 50}px)`,
          transition: preloaderDone ? 'opacity 0.5s ease 0.1s' : 'none',
        }}
      >
        <div className="text-center">
          <p className="font-bold uppercase" style={{ fontSize: '42px', lineHeight: '1.1', letterSpacing: '0.05em' }}>
            HELLA
            <br />
            ឆ្ងាញ់
          </p>
          <p className="mt-6 text-[13px] uppercase tracking-[0.3em]">
            Cambodian Cooking Collective
          </p>
        </div>
      </div>

      {/* Mission section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-32 max-w-3xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 opacity-40">
          Who We Are
        </p>
        <p
          className="font-bold uppercase leading-tight"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.04em' }}
        >
          We are a community of Cambodian cooks, storytellers, and food lovers keeping Khmer cuisine alive — one meal at a time.
        </p>
        <p className="mt-10 text-[13px] uppercase tracking-[0.2em] leading-relaxed opacity-60 max-w-lg">
          We gather to cook together, share recipes passed down through generations, and build a space where Khmer food is celebrated, documented, and passed forward.
        </p>
      </section>
    </>
  )
}

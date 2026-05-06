'use client'

import { useRef, useState, useEffect } from 'react'

export default function MissionSection() {
  const ref = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setExpanded(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center w-full bg-white"
      style={{
        zIndex: 2,
        position: 'sticky',
        top: 0,
        clipPath: expanded ? 'inset(0 0% 0 0%)' : 'inset(0 35% 0 35%)',
        transition: 'clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="max-w-3xl mx-auto px-8 py-32 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] mb-8 opacity-40">
          Who We Are
        </p>
        <p
          className="font-bold uppercase leading-tight"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.04em' }}
        >
          We are a community of Cambodian cooks, storytellers, and food lovers keeping Khmer cuisine alive — one meal at a time.
        </p>
        <p className="mt-10 text-[13px] uppercase tracking-[0.2em] leading-relaxed opacity-60 max-w-lg mx-auto">
          We gather to cook together, share recipes passed down through generations, and build a space where Khmer food is celebrated, documented, and passed forward.
        </p>
      </div>
    </section>
  )
}

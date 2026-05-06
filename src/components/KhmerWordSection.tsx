'use client'

import { useRef, useState, useEffect } from 'react'

const variations = ['CHNGAÑ', '/tɕŋaːɲ/', 'DELICIOUS']

type Phase = 'idle' | 'fadein' | 'slide' | 'typing' | 'hold'

export default function KhmerWordSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)
  const [slid, setSlid] = useState(false)
  const [dotVisible, setDotVisible] = useState(false)
  const [khmerVisible, setKhmerVisible] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [displayedChars, setDisplayedChars] = useState(0)
  const [phase, setPhase] = useState<Phase>('idle')

  // Trigger on scroll into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  // Main sequence
  useEffect(() => {
    if (!started) return

    // Phase 0: fade in ឆ្ ngaaN
    setPhase('fadein')
    setKhmerVisible(true)

    const t1 = setTimeout(() => {
      // Phase 1: slide left
      setPhase('slide')
      setSlid(true)

      const t2 = setTimeout(() => {
        // Dot fades in
        setDotVisible(true)
        setPhase('typing')
        setWordIndex(0)
        setDisplayedChars(0)
      }, 600)

      return () => clearTimeout(t2)
    }, 500)

    return () => clearTimeout(t1)
  }, [started])

  // Typing effect
  useEffect(() => {
    if (phase !== 'typing') return
    const word = variations[wordIndex]
    if (displayedChars >= word.length) {
      // Word fully typed — hold
      setPhase('hold')
      return
    }
    const t = setTimeout(() => {
      setDisplayedChars((c) => c + 1)
    }, 120)
    return () => clearTimeout(t)
  }, [phase, displayedChars, wordIndex])

  // Hold → erase or done
  useEffect(() => {
    if (phase !== 'hold') return
    const t = setTimeout(() => {
      setDisplayedChars(0)
      setWordIndex((i) => (i + 1) % variations.length)
      setPhase('typing')
    }, 1200)
    return () => clearTimeout(t)
  }, [phase, wordIndex])

  const fontSize = 'clamp(52px, 8vw, 88px)'
  const currentWord = variations[wordIndex] ?? ''

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
    >
      <div
        className="flex items-center"
        style={{ fontSize, fontFamily: 'var(--font-mono), monospace' }}
      >
        {/* ឆ្ ngaaN — slides left on trigger */}
        <span
          style={{
            opacity: khmerVisible ? 1 : 0,
            transform: slid ? 'translateX(-12px)' : 'translateX(0)',
            transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.4,0,0.2,1)',
            display: 'inline-block',
            fontWeight: 900,
            WebkitTextStroke: '1.5px white',
          }}
        >
          ឆ្ងាញ់
        </span>

        {/* Dot */}
        <span
          className="font-bold mx-4"
          style={{
            opacity: dotVisible ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          •
        </span>

        {/* Typed variation */}
        <span
          className="font-bold"
          style={{ minWidth: '2ch' }}
        >
          {currentWord.substring(0, displayedChars)}
        </span>
      </div>
    </section>
  )
}

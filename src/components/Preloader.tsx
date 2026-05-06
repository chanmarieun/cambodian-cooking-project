'use client'

import { useState, useEffect } from 'react'

const words = ['HEALING', 'JOY']

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)        // 0,1 = rotating words; 2 = final HELLA slide
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in')
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    if (phase === 'in') {
      // hold after drop-in
      t = setTimeout(() => setPhase('hold'), 100)
    } else if (phase === 'hold') {
      if (step < words.length) {
        // rotate to next word
        t = setTimeout(() => setPhase('out'), 1100)
      } else {
        // final HELLA — linger then fade the whole preloader
        t = setTimeout(() => {
          setFadeOut(true)
          setTimeout(onComplete, 700)
        }, 1600)
      }
    } else if (phase === 'out') {
      t = setTimeout(() => {
        setStep(s => s + 1)
        setPhase('in')
      }, 350)
    }

    return () => clearTimeout(t)
  }, [phase, step, onComplete])

  const isFinal = step === words.length
  const word = isFinal ? null : words[step]

  return (
    <div
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: fadeOut ? 'opacity 0.7s ease' : 'none',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      {!isFinal ? (
        <div className="text-center">
          <p
            className="text-[13px] uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            Khmer Food Is
          </p>
          <p
            key={`${step}-${phase}`}
            className="font-bold italic mt-2"
            style={{
              fontSize: '42px',
              lineHeight: 1.1,
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-mono), monospace',
              animation:
                phase === 'in'
                  ? 'dropBounceIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards'
                  : phase === 'out'
                  ? 'dropOut 0.3s ease-in forwards'
                  : 'none',
            }}
          >
            {word}
          </p>
        </div>
      ) : (
        <div className="text-center" key="final">
          <p
            className="text-[13px] uppercase tracking-[0.3em]"
            style={{ fontFamily: 'var(--font-mono), monospace' }}
          >
            Khmer Food Is
          </p>
          <p
            className="font-bold uppercase mt-2"
            style={{
              fontSize: '42px',
              lineHeight: 1.1,
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-mono), monospace',
              animation: phase === 'in'
                ? 'dropBounceIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards'
                : 'none',
            }}
          >
            HELLA
            <br />
            <span style={{ fontWeight: 900, WebkitTextStroke: '1.5px black' }}>ឆ្ងាញ់</span>
          </p>
        </div>
      )}

      <style>{`
        @keyframes dropBounceIn {
          0%   { opacity: 0; transform: translateY(-50px); }
          60%  { opacity: 1; transform: translateY(8px); }
          80%  { transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes dropOut {
          0%   { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(40px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

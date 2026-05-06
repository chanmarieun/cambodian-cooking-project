'use client'

import { useState, useEffect } from 'react'

export default function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute bottom-8 left-8"
      style={{ fontFamily: 'var(--font-mono), monospace' }}
    >
      <p className="text-[13px] uppercase tracking-widest opacity-50">{time}</p>
      <p className="text-[13px] uppercase tracking-widest opacity-50">Bay Area • California</p>
      <p className="text-[13px] uppercase tracking-widest opacity-50">37.8272° N, 122.2913° W</p>
    </div>
  )
}

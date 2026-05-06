'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Event } from '@/lib/events'

const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const MONTH_NAMES = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

export default function CalendarGrid({ events }: { events: Event[] }) {
  const router = useRouter()
  const [viewDate, setViewDate] = useState(() => new Date())

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const eventMap: Record<string, Event> = {}
  for (const e of events) {
    eventMap[e.date] = e
  }

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }
  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1))
  }

  return (
    <div className="w-full" style={{ fontFamily: 'var(--font-mono), monospace' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-black/10">
        <button
          onClick={prevMonth}
          className="text-[11px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
        >
          ← Prev
        </button>
        <p className="text-[13px] uppercase tracking-[0.3em] font-bold">
          {MONTH_NAMES[month]} {year}
        </p>
        <button
          onClick={nextMonth}
          className="text-[11px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
        >
          Next →
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-black/10">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="py-2 text-[clamp(8px,1vw,10px)] uppercase tracking-widest opacity-30 text-center"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="aspect-square border-b border-r border-black/10" />
          }

          const dateStr = `${year}-${pad2(month + 1)}-${pad2(day)}`
          const event = eventMap[dateStr]

          if (event) {
            return (
              <div
                key={dateStr}
                className="relative aspect-square border-b border-r border-black bg-black cursor-pointer flex flex-col justify-between overflow-hidden"
                style={{ padding: 'clamp(4px, 1.2vw, 12px)' }}
                onClick={() => router.push(`/events/${event.slug}`)}
              >
                <span
                  className="text-white opacity-60 leading-none"
                  style={{ fontSize: 'clamp(10px, 2vw, 20px)' }}
                >
                  {day}
                </span>
                <div>
                  <p
                    className="uppercase tracking-widest text-white/60 mb-1 line-clamp-2 leading-snug"
                    style={{ fontSize: 'clamp(7px, 0.9vw, 10px)' }}
                  >
                    {event.title}
                  </p>
                  <span
                    className="inline-block uppercase tracking-widest text-black bg-white leading-none"
                    style={{ fontSize: 'clamp(7px, 0.9vw, 10px)', padding: 'clamp(2px, 0.4vw, 4px) clamp(4px, 0.6vw, 8px)' }}
                  >
                    Register →
                  </span>
                </div>
              </div>
            )
          }

          return (
            <div key={dateStr} className="aspect-square border-b border-r border-black/10 relative overflow-hidden">
              <span
                className="absolute top-[8%] left-[10%] opacity-30 leading-none"
                style={{ fontSize: 'clamp(10px, 2vw, 20px)' }}
              >
                {day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

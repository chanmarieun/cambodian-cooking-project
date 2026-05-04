import Link from 'next/link'
import { getAllEvents } from '@/lib/events'
import { format } from 'date-fns'

export const metadata = { title: 'Events — Cambodian Cooking Collective' }

export default function EventsPage() {
  const today = new Date().toISOString().split('T')[0]
  const events = getAllEvents()
  const upcoming = events.filter((e) => e.date >= today)
  const past = events.filter((e) => e.date < today)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Events</h1>
      <p className="text-stone-500 mb-10">
        Join us for hands-on cooking sessions and community gatherings.
      </p>

      {upcoming.length > 0 && (
        <section className="mb-16">
          <h2 className="text-lg font-semibold text-stone-700 mb-4">Upcoming</h2>
          <div className="space-y-4">
            {upcoming.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 bg-white rounded-xl border border-stone-200 hover:border-amber-300 transition-colors"
              >
                <div className="flex-shrink-0 text-center sm:w-16">
                  <p className="text-2xl font-bold text-amber-700">
                    {format(new Date(event.date + 'T00:00:00'), 'd')}
                  </p>
                  <p className="text-xs text-stone-400 uppercase tracking-wide">
                    {format(new Date(event.date + 'T00:00:00'), 'MMM')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-900">{event.title}</h3>
                  <p className="text-sm text-stone-500 mt-1 line-clamp-2">{event.description}</p>
                  <p className="text-xs text-stone-400 mt-2">
                    {event.time} · {event.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-stone-400 mb-4">Past Sessions</h2>
          <div className="space-y-3 opacity-60">
            {past.map((event) => (
              <div
                key={event.slug}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-100"
              >
                <div className="text-center w-12">
                  <p className="text-lg font-bold text-stone-400">
                    {format(new Date(event.date + 'T00:00:00'), 'd')}
                  </p>
                  <p className="text-xs text-stone-300 uppercase">
                    {format(new Date(event.date + 'T00:00:00'), 'MMM')}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-stone-600 text-sm">{event.title}</p>
                  <p className="text-xs text-stone-400">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <p className="text-stone-400 text-sm">No events yet — check back soon!</p>
      )}
    </div>
  )
}

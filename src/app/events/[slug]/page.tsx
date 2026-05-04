import { getAllEvents, getEventBySlug } from '@/lib/events'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import RSVPForm from '@/components/RSVPForm'

export async function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }))
}

export async function generateMetadata(props: PageProps<'/events/[slug]'>) {
  const { slug } = await props.params
  const event = getEventBySlug(slug)
  return { title: event ? `${event.title} — Cambodian Cooking Collective` : 'Event Not Found' }
}

export default async function EventPage(props: PageProps<'/events/[slug]'>) {
  const { slug } = await props.params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  const isPast = event.date < new Date().toISOString().split('T')[0]

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="text-sm text-amber-700 font-medium mb-2">
          {format(new Date(event.date + 'T00:00:00'), 'EEEE, MMMM d, yyyy')} · {event.time}
        </p>
        <h1 className="text-3xl font-bold text-stone-900 mb-3">{event.title}</h1>
        <p className="text-stone-500">{event.description}</p>
        <p className="text-sm text-stone-400 mt-3">📍 {event.location}</p>
        {event.capacity > 0 && (
          <p className="text-sm text-stone-400">Limited to {event.capacity} participants</p>
        )}
      </div>

      {event.content.trim() && (
        <div
          className="prose prose-stone prose-sm max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: event.content }}
        />
      )}

      {isPast ? (
        <p className="text-stone-400 text-sm italic">This session has already taken place.</p>
      ) : (
        <RSVPForm eventSlug={event.slug} eventTitle={event.title} />
      )}
    </div>
  )
}

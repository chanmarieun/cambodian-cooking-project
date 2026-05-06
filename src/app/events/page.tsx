import { getAllEvents } from '@/lib/events'
import CalendarGrid from '@/components/CalendarGrid'

export const metadata = { title: 'Calendar — Cambodian Cooking Collective' }

export default function EventsPage() {
  const events = getAllEvents()
  return <CalendarGrid events={events} />
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const eventsDir = path.join(process.cwd(), 'content/events')

export type Event = {
  slug: string
  title: string
  date: string
  time: string
  location: string
  description: string
  capacity: number
  image: string
  content: string
}

export function getAllEvents(): Event[] {
  if (!fs.existsSync(eventsDir)) return []
  const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(eventsDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        date: data.date ?? '',
        time: data.time ?? '',
        location: data.location ?? '',
        description: data.description ?? '',
        capacity: data.capacity ?? 0,
        image: data.image ?? '',
        content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getEventBySlug(slug: string): Event | undefined {
  return getAllEvents().find((e) => e.slug === slug)
}

export function getUpcomingEvents(): Event[] {
  const today = new Date().toISOString().split('T')[0]
  return getAllEvents().filter((e) => e.date >= today)
}

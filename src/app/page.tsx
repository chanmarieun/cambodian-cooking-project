import Link from 'next/link'
import { getAllRecipes } from '@/lib/recipes'
import { getUpcomingEvents } from '@/lib/events'
import { format } from 'date-fns'

export default function HomePage() {
  const recipes = getAllRecipes().slice(0, 3)
  const events = getUpcomingEvents().slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-stone-100 py-24 px-4 text-center">
        <p className="text-sm font-medium tracking-widest text-amber-700 uppercase mb-4">
          A Community Gathering
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 max-w-2xl mx-auto leading-tight">
          Cooking Khmer Food Together
        </h1>
        <p className="mt-6 text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
          The Cambodian Cooking Collective brings people together to learn, cook, and share
          the foods and stories of Khmer culture — one dish at a time.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/events"
            className="px-6 py-3 rounded-full bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 transition-colors"
          >
            Join an Event
          </Link>
          <Link
            href="/recipes"
            className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
        {/* Upcoming Events */}
        {events.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-stone-900">Upcoming Sessions</h2>
              <Link href="/events" className="text-sm text-amber-700 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="block p-5 bg-white rounded-xl border border-stone-200 hover:border-amber-300 transition-colors"
                >
                  <p className="text-xs text-amber-700 font-medium mb-1">
                    {format(new Date(event.date + 'T00:00:00'), 'MMMM d, yyyy')} · {event.time}
                  </p>
                  <h3 className="font-semibold text-stone-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2">{event.description}</p>
                  <p className="text-xs text-stone-400 mt-2">{event.location}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Featured Recipes */}
        {recipes.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-stone-900">Recipes</h2>
              <Link href="/recipes" className="text-sm text-amber-700 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="block p-5 bg-white rounded-xl border border-stone-200 hover:border-amber-300 transition-colors"
                >
                  <h3 className="font-semibold text-stone-900 mb-1">{recipe.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2">{recipe.description}</p>
                  {recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Mission blurb */}
        <section className="bg-amber-50 rounded-2xl p-8 md:p-12 text-center border border-amber-100">
          <h2 className="text-2xl font-semibold text-stone-900 mb-4">Why We Gather</h2>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Food is memory. Every recipe carries a story — of grandmothers, of home, of survival and
            joy. The Cambodian Cooking Collective is a space to preserve these stories and pass them
            forward, together.
          </p>
          <Link
            href="/about"
            className="inline-block mt-6 text-sm font-medium text-amber-700 hover:underline"
          >
            Learn more about us →
          </Link>
        </section>
      </div>
    </div>
  )
}

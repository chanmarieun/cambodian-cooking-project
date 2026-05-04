import Link from 'next/link'

export const metadata = { title: 'About — Cambodian Cooking Collective' }

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-stone-900 mb-6">About Us</h1>

      <div className="prose prose-stone prose-sm max-w-none space-y-5">
        <p>
          The Cambodian Cooking Collective is a community-led project rooted in cultural
          preservation and the simple joy of cooking together. We gather in person to learn
          how to make traditional Khmer dishes — not from a cookbook, but from each other.
        </p>

        <p>
          Food is one of the most powerful ways we hold onto who we are. For many in the
          Cambodian diaspora, a recipe carries memory — the smell of a grandmother&apos;s kitchen,
          a holiday meal, a taste of home that is thousands of miles away. Our gatherings
          are a place to keep those memories alive and share them across generations.
        </p>

        <p>
          Whether you grew up eating these dishes or are encountering them for the first
          time, you are welcome here. We believe that learning to cook together is an act of
          community building, and that every person who joins our table is part of this
          cultural story.
        </p>

        <h2 className="text-lg font-semibold text-stone-900 mt-8 mb-2">What We Do</h2>
        <ul>
          <li>Host hands-on cooking sessions where participants learn Khmer recipes together</li>
          <li>Document and share recipes so they are never lost</li>
          <li>Create space for people to share stories about food, family, and culture</li>
          <li>Welcome anyone who wants to learn — no experience necessary</li>
        </ul>

        <h2 className="text-lg font-semibold text-stone-900 mt-8 mb-2">Get Involved</h2>
        <p>
          The best way to join is to come to a session. Check our{' '}
          <Link href="/events" className="text-amber-700 hover:underline">
            events calendar
          </Link>{' '}
          for upcoming gatherings. If you have a recipe, a story, or a question, we would
          love to hear from you — reach out through our{' '}
          <Link href="/ask" className="text-amber-700 hover:underline">
            Ask Us page
          </Link>.
        </p>
      </div>
    </div>
  )
}

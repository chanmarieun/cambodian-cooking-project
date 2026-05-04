import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { format } from 'date-fns'

export const metadata = { title: 'Stories — Cambodian Cooking Collective' }

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-stone-900 mb-2">Stories</h1>
      <p className="text-stone-500 mb-10">
        Articles, memories, and reflections from our community.
      </p>

      {posts.length === 0 ? (
        <p className="text-stone-400 text-sm">Stories coming soon.</p>
      ) : (
        <div className="divide-y divide-stone-100">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block py-7 hover:opacity-80 transition-opacity"
            >
              <p className="text-xs text-stone-400 mb-1">
                {post.author} · {format(new Date(post.date + 'T00:00:00'), 'MMMM d, yyyy')}
              </p>
              <h2 className="text-xl font-semibold text-stone-900 mb-1">{post.title}</h2>
              <p className="text-stone-500 text-sm line-clamp-2">{post.description}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

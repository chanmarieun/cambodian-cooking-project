import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  return { title: post ? `${post.title} — Cambodian Cooking Collective` : 'Post Not Found' }
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="max-w-2xl mx-auto px-4 py-16">
      <header className="mb-10">
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-stone-900 mb-3">{post.title}</h1>
        <p className="text-stone-500">{post.description}</p>
        <p className="text-xs text-stone-400 mt-3">
          By {post.author} · {format(new Date(post.date + 'T00:00:00'), 'MMMM d, yyyy')}
        </p>
      </header>
      <div
        className="prose prose-stone prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}

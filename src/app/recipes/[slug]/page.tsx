import { getAllRecipes, getRecipeBySlug } from '@/lib/recipes'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'

export async function generateStaticParams() {
  return getAllRecipes().map((r) => ({ slug: r.slug }))
}

export async function generateMetadata(props: PageProps<'/recipes/[slug]'>) {
  const { slug } = await props.params
  const recipe = getRecipeBySlug(slug)
  return { title: recipe ? `${recipe.title} — Cambodian Cooking Collective` : 'Recipe Not Found' }
}

export default async function RecipePage(props: PageProps<'/recipes/[slug]'>) {
  const { slug } = await props.params
  const recipe = getRecipeBySlug(slug)
  if (!recipe) notFound()

  return (
    <article className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-8">
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">{recipe.title}</h1>
        <p className="text-stone-500">{recipe.description}</p>
        <p className="text-xs text-stone-400 mt-2">
          By {recipe.author} · {format(new Date(recipe.date + 'T00:00:00'), 'MMMM d, yyyy')}
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-stone-900 mb-3">Ingredients</h2>
        <ul className="space-y-1.5">
          {recipe.ingredients.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-stone-700">
              <span className="text-amber-500 mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-stone-900 mb-3">Instructions</h2>
        <ol className="space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4 text-sm text-stone-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {recipe.content.trim() && (
        <section className="prose prose-stone prose-sm max-w-none border-t border-stone-100 pt-8 mt-8">
          <div dangerouslySetInnerHTML={{ __html: recipe.content }} />
        </section>
      )}
    </article>
  )
}

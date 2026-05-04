import { getAllRecipes, getRecipeBySlug } from '@/lib/recipes'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Image from 'next/image'
import PronounceButton from '@/components/PronounceButton'

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
    <div className="max-w-5xl mx-auto px-4 py-12 flex gap-10">
      {/* Left sidebar */}
      <aside className="hidden lg:block w-44 flex-shrink-0">
        <nav className="sticky top-24 space-y-2 text-sm text-stone-500">
          <a href="#recipe" className="block hover:text-stone-900 transition-colors">
            Recipe Name
          </a>
          <a href="#ingredients" className="block hover:text-stone-900 transition-colors">
            Ingredients
          </a>
          {recipe.equipment.length > 0 && (
            <a href="#equipment" className="block hover:text-stone-900 transition-colors">
              Equipment
            </a>
          )}
          <a href="#instructions" className="block hover:text-stone-900 transition-colors">
            Instructions
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <article className="flex-1 min-w-0">
        {/* Title */}
        <section id="recipe" className="mb-8 scroll-mt-24">
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
          <div className="flex items-start gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-stone-900">
              {recipe.title}
              {recipe.titleKhmer && (
                <span className="ml-2 text-stone-400 font-normal">({recipe.titleKhmer})</span>
              )}
            </h1>
            {recipe.titleKhmer && <PronounceButton title={recipe.titleKhmer} />}
          </div>
          <p className="text-stone-500 mt-2">{recipe.description}</p>
          <p className="text-xs text-stone-400 mt-2">
            By {recipe.author} · {format(new Date(recipe.date + 'T00:00:00'), 'MMMM d, yyyy')}
          </p>
        </section>

        {/* Image */}
        {recipe.image ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 bg-stone-100">
            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-full aspect-video rounded-xl bg-stone-100 mb-10" />
        )}

        {/* Ingredients */}
        <section id="ingredients" className="mb-10 scroll-mt-24">
          <h2 className="text-xl font-semibold text-stone-900 mb-5">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recipe.ingredients.meats.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-stone-700 mb-2">Meats</h3>
                <ul className="space-y-1.5">
                  {recipe.ingredients.meats.map((item, i) => (
                    <li key={i} className="text-sm text-stone-600">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {recipe.ingredients.produce.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-stone-700 mb-2">Produce</h3>
                <ul className="space-y-1.5">
                  {recipe.ingredients.produce.map((item, i) => (
                    <li key={i} className="text-sm text-stone-600">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {recipe.ingredients.pantry.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-stone-700 mb-2">Pantry</h3>
                <ul className="space-y-1.5">
                  {recipe.ingredients.pantry.map((item, i) => (
                    <li key={i} className="text-sm text-stone-600">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Equipment */}
        {recipe.equipment.length > 0 && (
          <section id="equipment" className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">Equipment</h2>
            <ul className="space-y-1.5">
              {recipe.equipment.map((item, i) => (
                <li key={i} className="text-sm text-stone-600">{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Instructions */}
        <section id="instructions" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-stone-900 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm text-stone-700">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {recipe.content.trim() && (
          <div
            className="prose prose-stone prose-sm max-w-none border-t border-stone-100 pt-8 mt-10"
            dangerouslySetInnerHTML={{ __html: recipe.content }}
          />
        )}
      </article>
    </div>
  )
}

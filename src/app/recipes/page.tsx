import { getAllRecipes } from '@/lib/recipes'
import RecipeSearch from '@/components/RecipeSearch'

export const metadata = { title: 'Recipes — Cambodian Cooking Collective' }

export default function RecipesPage() {
  const recipes = getAllRecipes()

  return (
    <div className="max-w-5xl mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold uppercase mb-2">Recipes</h1>
      <p className="text-[11px] uppercase tracking-[0.2em] opacity-50 mb-12">
        Traditional Khmer recipes, passed down and shared with love.
      </p>
      <RecipeSearch recipes={recipes} />
    </div>
  )
}

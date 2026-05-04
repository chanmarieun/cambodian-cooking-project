'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { Recipe } from '@/lib/recipes'

export default function RecipeSearch({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(recipes, {
        keys: ['title', 'description', 'tags', 'ingredients'],
        threshold: 0.35,
      }),
    [recipes]
  )

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : recipes

  return (
    <div>
      <input
        type="search"
        placeholder="Search recipes — try &quot;soup&quot;, &quot;noodles&quot;, &quot;rice&quot;…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 mb-8"
      />

      {results.length === 0 ? (
        <p className="text-stone-400 text-sm">No recipes found for &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="block p-5 bg-white rounded-xl border border-stone-200 hover:border-amber-300 transition-colors"
            >
              <h2 className="font-semibold text-stone-900 mb-1">{recipe.title}</h2>
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
      )}
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Fuse from 'fuse.js'
import type { Recipe } from '@/lib/recipes'

export default function RecipeSearch({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(recipes, {
        keys: [
          'title',
          'titleKhmer',
          'description',
          'tags',
          'ingredients.meats',
          'ingredients.produce',
          'ingredients.pantry',
        ],
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
        placeholder="Search recipes — soup, noodles, rice…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-0 py-3 bg-transparent border-b border-black/20 text-[12px] uppercase tracking-widest focus:outline-none focus:border-black mb-12 placeholder:text-black/30"
      />

      {results.length === 0 ? (
        <p className="text-[11px] uppercase tracking-widest opacity-40">No recipes found for &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              className="group block rounded-3xl overflow-hidden"
              style={{ border: '1px solid rgba(0,0,0,0.08)' }}
            >
              {/* Photo + gradient + overlaid text */}
              <div className="relative w-full aspect-[3/4] bg-neutral-900 overflow-hidden">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-800" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Text content over gradient */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-bold uppercase text-white text-[15px] leading-snug tracking-wide">
                    {recipe.title}
                  </p>
                  {recipe.titleKhmer && (
                    <p className="text-white/60 text-[13px] mt-0.5 font-normal">
                      {recipe.titleKhmer}
                    </p>
                  )}
                  <p className="text-white/70 text-[11px] mt-2 leading-relaxed line-clamp-2 uppercase tracking-wide">
                    {recipe.description}
                  </p>

                  {recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider text-white px-3 py-1 rounded-full"
                          style={{ backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA strip */}
              <div className="bg-white px-5 py-4 flex items-center justify-center">
                <span className="text-[11px] uppercase tracking-widest font-bold text-black">
                  View Recipe
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

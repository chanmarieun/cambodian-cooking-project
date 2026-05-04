import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const recipesDir = path.join(process.cwd(), 'content/recipes')

export type Recipe = {
  slug: string
  title: string
  description: string
  image: string
  ingredients: string[]
  steps: string[]
  tags: string[]
  author: string
  date: string
  content: string
}

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDir)) return []
  const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(recipesDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        image: data.image ?? '',
        ingredients: data.ingredients ?? [],
        steps: data.steps ?? [],
        tags: data.tags ?? [],
        author: data.author ?? '',
        date: data.date ?? '',
        content,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return getAllRecipes().find((r) => r.slug === slug)
}

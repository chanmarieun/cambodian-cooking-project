export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-20 py-10 text-center text-sm text-stone-400">
      <p>© {new Date().getFullYear()} Cambodian Cooking Collective</p>
      <p className="mt-1">Made with love for our community</p>
    </footer>
  )
}

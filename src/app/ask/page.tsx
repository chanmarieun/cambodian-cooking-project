import AskForm from '@/components/AskForm'

export const metadata = { title: 'Ask Us — Cambodian Cooking Collective' }

export default function AskPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-stone-900 mb-3">Ask Us</h1>
      <p className="text-stone-500 mb-2">
        Have a question about a recipe, an ingredient, or Khmer cooking in general?
      </p>
      <p className="text-stone-500 mb-10">
        Ask away — we read every question and respond personally.
      </p>
      <div className="bg-amber-50 rounded-xl border border-amber-100 p-4 mb-8 text-sm text-amber-800">
        <strong>Examples of things you can ask:</strong>
        <ul className="mt-1 space-y-1 list-disc list-inside text-amber-700">
          <li>I don&apos;t have galangal — can I substitute ginger?</li>
          <li>How do I know when kroeung paste is ready?</li>
          <li>Where can I find Khmer ingredients locally?</li>
          <li>What dishes are good for beginners?</li>
        </ul>
      </div>
      <AskForm />
    </div>
  )
}

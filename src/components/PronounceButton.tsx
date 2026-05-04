'use client'

export default function PronounceButton({ title }: { title: string }) {
  function speak() {
    const utterance = new SpeechSynthesisUtterance(title)
    utterance.lang = 'km-KH'
    window.speechSynthesis.speak(utterance)
  }

  return (
    <button
      onClick={speak}
      aria-label="Hear pronunciation"
      className="mt-1 text-stone-400 hover:text-amber-600 transition-colors text-xl leading-none"
    >
      🔊
    </button>
  )
}

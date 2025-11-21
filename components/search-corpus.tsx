"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

interface WordData {
  id: number
  word: string
  lemma: string
  partOfSpeech: string
  meaning: string
  examples: Array<{
    text: string
    translation: string
    workId: string
    workTitle: string
  }>
}

export default function SearchCorpus() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<WordData[]>([])
  const [allWords, setAllWords] = useState<WordData[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json")
        const data = await response.json()
        setAllWords(data.words)
        setLoading(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([])
      return
    }

    const query = searchTerm.toLowerCase()
    const filtered = allWords.filter(
      (word) =>
        word.word.toLowerCase().includes(query) ||
        word.meaning.toLowerCase().includes(query) ||
        word.lemma.toLowerCase().includes(query),
    )
    setResults(filtered)
  }, [searchTerm, allWords])

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) => (part.toLowerCase() === query.toLowerCase() ? `<mark>${part}</mark>` : part)).join("")
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        {/* Search Header */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">Korpus Qidiruvʻi</h1>
            <p className="text-lg text-muted-foreground">
              So'z yoki iboralarni qidirish. Tizim misollarni va ma'lumotlarni ko'rsatadi.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="So'zni kiritish (masalan: umr, qalb, sog'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border-2 border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Maʼlumotlar yuklanmoqda...</p>
          </div>
        ) : searchTerm.trim() === "" ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border p-8">
            <p className="text-muted-foreground text-lg">So'zni qidirish uchun matn kiriting</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border p-8">
            <p className="text-muted-foreground text-lg">
              "{searchTerm}" so'zi topilmadi. Boshqa so'z bilan sinab ko'ring.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground font-medium">{results.length} natija topildi</p>

            {results.map((word) => (
              <div
                key={word.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Word Header */}
                <button
                  onClick={() => setExpandedId(expandedId === word.id ? null : word.id)}
                  className="w-full p-6 flex justify-between items-start gap-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold text-primary">{word.word}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {word.partOfSpeech}
                      </span>
                      <span className="text-muted-foreground">
                        Asosi: <span className="font-semibold text-foreground">{word.lemma}</span>
                      </span>
                    </div>
                    <p className="text-lg text-foreground mt-2">{word.meaning}</p>
                  </div>
                  <span className="text-2xl text-muted-foreground">{expandedId === word.id ? "−" : "+"}</span>
                </button>

                {/* Examples */}
                {expandedId === word.id && (
                  <div className="border-t border-border bg-muted/30 p-6">
                    <h4 className="font-semibold text-foreground mb-4">Misol jumlalar:</h4>
                    <div className="space-y-4">
                      {word.examples.map((example, idx) => (
                        <div key={idx} className="bg-card rounded-lg p-4 border border-border/50">
                          <p className="text-lg text-foreground mb-2 leading-relaxed">
                            "
                            {example.text.split(new RegExp(`(${searchTerm})`, "i")).map((part, i) =>
                              part.toLowerCase() === searchTerm.toLowerCase() ? (
                                <mark key={i} className="highlight px-1 rounded">
                                  {part}
                                </mark>
                              ) : (
                                part
                              ),
                            )}
                            "
                          </p>
                          <p className="text-muted-foreground italic mb-3">{example.translation}</p>
                          <p className="text-xs text-muted-foreground font-medium">📖 {example.workTitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

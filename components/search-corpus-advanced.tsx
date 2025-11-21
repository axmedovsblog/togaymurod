'use client'

import {
	BookOpen,
	FileText,
	MessageSquare,
	Search,
	TrendingUp,
	X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface BookMetadata {
	id: string
	title: string
	author: string
	year: number
	genre: string
	path: string
	txtPath?: string
	description: string
}

interface SearchResult {
	bookId: string
	bookTitle: string
	sentence: string
	context: string[] // 5 gaplik kontekst
	pageNumber?: number
	lemmaVariants: string[]
}

interface Statistics {
	bookId: string
	bookTitle: string
	count: number
	percentage: number
}

interface NGram {
	before: { text: string; count: number }[]
	after: { text: string; count: number }[]
}

export default function SearchCorpusAdvanced() {
	const [searchTerm, setSearchTerm] = useState('')
	const [books, setBooks] = useState<BookMetadata[]>([])
	const [results, setResults] = useState<SearchResult[]>([])
	const [statistics, setStatistics] = useState<Statistics[]>([])
	const [ngrams, setNgrams] = useState<NGram | null>(null)
	const [loading, setLoading] = useState(false)
	const [selectedBook, setSelectedBook] = useState<BookMetadata | null>(null)
	const [popoverPosition, setPopoverPosition] = useState<{
		x: number
		y: number
	} | null>(null)
	const [actualVariants, setActualVariants] = useState<string[]>([])
	const [activeTab, setActiveTab] = useState<'results' | 'stats' | 'ngrams'>(
		'results'
	)

	// Load books metadata
	useEffect(() => {
		fetch('/books-metadata.json')
			.then(res => res.json())
			.then(data => setBooks(data.books))
			.catch(err => console.error('Error loading books:', err))
	}, [])

	// Debug selectedBook changes
	useEffect(() => {
		console.log("selectedBook o'zgardi:", selectedBook)
	}, [selectedBook])

	// Uzbek morphology - simple lemmatization
	const getLemmaVariants = (word: string): string[] => {
		const baseWord = word.toLowerCase()
		const variants = [baseWord]

		// Common Uzbek suffixes
		const suffixes = [
			'im',
			'ing',
			'i',
			'si',
			'miz',
			'ingiz',
			'lari',
			'ni',
			'ga',
			'da',
			'dan',
			'ning',
			'lik',
			'chi',
			'siz',
			'li',
			'dagi',
			'dek',
			'day',
			'lar',
			'cha',
		]

		// Add variants with suffixes
		suffixes.forEach(suffix => {
			variants.push(baseWord + suffix)
		})

		// Remove suffixes to find root
		suffixes.forEach(suffix => {
			if (baseWord.endsWith(suffix) && baseWord.length > suffix.length + 2) {
				variants.push(baseWord.slice(0, -suffix.length))
			}
		})

		return [...new Set(variants)] // Remove duplicates
	}

	// Extract sentences from text
	const extractSentences = (text: string): string[] => {
		return text
			.split(/[.!?]+/)
			.map(s => s.trim())
			.filter(s => s.length > 0)
	}

	// Get 5-sentence context (2 before + current + 2 after)
	const getContext = (sentences: string[], index: number): string[] => {
		const start = Math.max(0, index - 2)
		const end = Math.min(sentences.length, index + 3)
		return sentences.slice(start, end)
	}

	// Calculate N-grams (words before and after)
	const calculateNGrams = (
		results: SearchResult[],
		searchWord: string
	): NGram => {
		const beforeWords: { [key: string]: number } = {}
		const afterWords: { [key: string]: number } = {}

		results.forEach(result => {
			const words = result.sentence.split(/\s+/)
			const searchIndex = words.findIndex(w =>
				w.toLowerCase().includes(searchWord.toLowerCase())
			)

			if (searchIndex > 0) {
				const before = words[searchIndex - 1].replace(/[.,!?;:]/g, '')
				beforeWords[before] = (beforeWords[before] || 0) + 1
			}

			if (searchIndex < words.length - 1) {
				const after = words[searchIndex + 1].replace(/[.,!?;:]/g, '')
				afterWords[after] = (afterWords[after] || 0) + 1
			}
		})

		const sortByCount = (obj: { [key: string]: number }) =>
			Object.entries(obj)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 10)
				.map(([text, count]) => ({ text, count }))

		return {
			before: sortByCount(beforeWords),
			after: sortByCount(afterWords),
		}
	}

	// Real PDF search function
	const performSearch = async () => {
		if (!searchTerm.trim()) return

		setLoading(true)

		try {
			const response = await fetch('/api/search-txt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ searchTerm }),
			})

			const data = await response.json()

			if (!response.ok) {
				console.error('API Error:', data)
				alert(
					data.message || 'Qidiruv xatosi: ' + (data.error || "Noma'lum xato")
				)
				setLoading(false)
				return
			}

			setResults(data.results || [])
			setStatistics(data.statistics || [])
			setNgrams(data.ngrams || null)
			setActualVariants(data.actualVariants || data.lemmaVariants || [])
		} catch (error) {
			console.error('Search error:', error)
			alert(
				"Tarmoq xatosi. Iltimos pdf-parse o'rnatilganini tekshiring: npm install pdf-parse --legacy-peer-deps"
			)
			setResults([])
			setStatistics([])
			setNgrams(null)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
			<div className='space-y-8'>
				{/* Header */}
				<div className='space-y-4'>
					<h1 className='text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100'>
						Kuchli Korpus Qidiruvi
					</h1>
					<p className='text-lg text-slate-600 dark:text-slate-300'>
						PDF asarlardan so'z va iboralarni qidiring. Statistika, kontekst va
						tahlillarni ko'ring.
					</p>
				</div>

				{/* Search Input */}
				<div className='relative'>
					<Search
						className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
						size={20}
					/>
					<input
						type='text'
						placeholder="So'z kiriting (masalan: umr, gul, hayot...)"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && performSearch()}
						className='w-full pl-12 pr-32 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors text-lg'
					/>
					{searchTerm && (
						<button
							onClick={() => {
								setSearchTerm('')
								setResults([])
								setStatistics([])
								setNgrams(null)
								setActualVariants([])
							}}
							className='absolute right-24 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
						>
							<X size={20} />
						</button>
					)}
					<button
						onClick={performSearch}
						className='absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors'
					>
						Qidirish
					</button>
				</div>

				{/* Lemma variants - only show actual found variants */}
				{actualVariants.length > 0 && (
					<div className='bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4'>
						<p className='text-sm text-emerald-800 dark:text-emerald-300 font-medium mb-2'>
							Topilgan shakllari ({actualVariants.length} ta):
						</p>
						<div className='flex flex-wrap gap-2'>
							{actualVariants.map((variant, i) => (
								<span
									key={i}
									className='px-3 py-1 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 rounded-full text-sm border border-emerald-200 dark:border-emerald-700'
								>
									{variant}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Loading */}
				{loading && (
					<div className='text-center py-12'>
						<div className='animate-spin w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto'></div>
						<p className='mt-4 text-slate-600 dark:text-slate-400'>
							PDF asarlardan qidirilmoqda...
						</p>
					</div>
				)}

				{/* Tabs */}
				{!loading && results.length > 0 && (
					<div className='border-b border-slate-200 dark:border-slate-700'>
						<div className='flex gap-4'>
							<button
								onClick={() => setActiveTab('results')}
								className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
									activeTab === 'results'
										? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
										: 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
								}`}
							>
								<span className='flex items-center gap-2'>
									<FileText size={18} />
									Natijalar ({results.length})
								</span>
							</button>
							<button
								onClick={() => setActiveTab('stats')}
								className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
									activeTab === 'stats'
										? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
										: 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
								}`}
							>
								<span className='flex items-center gap-2'>
									<TrendingUp size={18} />
									Statistika
								</span>
							</button>
							<button
								onClick={() => setActiveTab('ngrams')}
								className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
									activeTab === 'ngrams'
										? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
										: 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
								}`}
							>
								<span className='flex items-center gap-2'>
									<MessageSquare size={18} />
									Qo'shni so'zlar
								</span>
							</button>
						</div>
					</div>
				)}

				{/* Results Tab */}
				{!loading && activeTab === 'results' && results.length > 0 && (
					<div className='space-y-6'>
						{results.map((result, idx) => (
							<div
								key={idx}
								className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow'
							>
								{/* Book Info */}
								<div
									className='bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 cursor-pointer hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 transition-colors'
									onClick={() => {
										const book = books.find(b => b.id === result.bookId)
										setSelectedBook(book || null)
									}}
								>
									<div className='flex items-center gap-3'>
										<BookOpen
											size={20}
											className='text-emerald-600 dark:text-emerald-400'
										/>
										<div>
											<h3 className='font-bold text-slate-800 dark:text-slate-100'>
												{result.bookTitle}
											</h3>
											<p className='text-xs text-slate-600 dark:text-slate-400'>
												Ustiga bosib batafsil ma'lumot oling
											</p>
										</div>
									</div>
								</div>

								{/* Main Sentence */}
								<div className='p-6'>
									<div className='mb-4'>
										<div className='flex items-center justify-between mb-2'>
											<span className='text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase'>
												Topilgan gap
											</span>
											<button
												onClick={() => {
													console.log('Tugma bosildi!')
													const book = books.find(b => b.id === result.bookId)
													console.log('Kitob:', book)
													setSelectedBook(book || null)
												}}
												className='text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors'
											>
												📖 Asar haqida
											</button>
										</div>
										<p
											className='text-lg text-slate-800 dark:text-slate-100 mt-2 leading-relaxed cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 p-3 rounded-lg transition-colors relative'
											onClick={e => {
												const book = books.find(b => b.id === result.bookId)
												setSelectedBook(book || null)
												// O'sha joyda popover ko'rsatish uchun koordinatlarni saqlash
												const rect = e.currentTarget.getBoundingClientRect()
												setPopoverPosition({
													x: e.clientX,
													y: rect.bottom + window.scrollY,
												})
											}}
											title="Ustiga bosib asar haqida batafsil ma'lumot oling"
										>
											"
											{(() => {
												// Highlight all found variants in the sentence
												let highlighted = result.sentence
												const variants =
													actualVariants.length > 0
														? actualVariants
														: [searchTerm]

												// Create regex for all variants (case-insensitive)
												const regex = new RegExp(
													`(${variants.join('|')})`,
													'gi'
												)

												return highlighted.split(regex).map((part, i) => {
													const isMatch = variants.some(
														v => part.toLowerCase() === v.toLowerCase()
													)
													return isMatch ? (
														<mark
															key={i}
															className='bg-yellow-200 dark:bg-yellow-700 px-1 rounded font-semibold'
														>
															{part}
														</mark>
													) : (
														<span key={i}>{part}</span>
													)
												})
											})()}
											"
										</p>
									</div>

									{/* 5-sentence Context */}
									<div className='bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700'>
										<span className='text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2 block'>
											Kengaytirilgan kontekst (5 gap)
										</span>
										<div className='space-y-2'>
											{result.context.map((sentence, i) => {
												const variants =
													actualVariants.length > 0
														? actualVariants
														: [searchTerm]
												const regex = new RegExp(
													`(${variants.join('|')})`,
													'gi'
												)
												const isMainSentence = sentence === result.sentence

												return (
													<p
														key={i}
														className={`text-sm leading-relaxed ${
															isMainSentence
																? 'font-semibold text-emerald-700 dark:text-emerald-300'
																: 'text-slate-600 dark:text-slate-400'
														}`}
													>
														{sentence.split(regex).map((part, j) => {
															const isMatch = variants.some(
																v => part.toLowerCase() === v.toLowerCase()
															)
															return isMatch ? (
																<mark
																	key={j}
																	className='bg-yellow-200 dark:bg-yellow-700 px-0.5 rounded'
																>
																	{part}
																</mark>
															) : (
																<span key={j}>{part}</span>
															)
														})}
													</p>
												)
											})}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Statistics Tab */}
				{!loading && activeTab === 'stats' && statistics.length > 0 && (
					<div className='space-y-6'>
						<div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6'>
							<h3 className='text-xl font-bold text-slate-800 dark:text-slate-100 mb-6'>
								Asarlardagi taqsimot
							</h3>
							<div className='space-y-4'>
								{statistics.map((stat, idx) => (
									<div key={idx} className='space-y-2'>
										<div className='flex justify-between items-center'>
											<span className='font-semibold text-slate-700 dark:text-slate-300'>
												{stat.bookTitle}
											</span>
											<span className='text-emerald-600 dark:text-emerald-400 font-bold'>
												{stat.count} marta ({stat.percentage}%)
											</span>
										</div>
										<div className='w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden'>
											<div
												className='bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500'
												style={{ width: `${stat.percentage}%` }}
											></div>
										</div>
									</div>
								))}
							</div>

							<div className='mt-6 pt-6 border-t border-slate-200 dark:border-slate-700'>
								<div className='grid grid-cols-3 gap-4 text-center'>
									<div>
										<p className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
											{statistics.reduce((sum, s) => sum + s.count, 0)}
										</p>
										<p className='text-sm text-slate-600 dark:text-slate-400'>
											Jami uchrashuv
										</p>
									</div>
									<div>
										<p className='text-2xl font-bold text-teal-600 dark:text-teal-400'>
											{statistics.length}
										</p>
										<p className='text-sm text-slate-600 dark:text-slate-400'>
											Asarlar soni
										</p>
									</div>
									<div>
										<p className='text-2xl font-bold text-cyan-600 dark:text-cyan-400'>
											{Math.round(
												statistics.reduce((sum, s) => sum + s.count, 0) /
													statistics.length
											)}
										</p>
										<p className='text-sm text-slate-600 dark:text-slate-400'>
											O'rtacha
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* N-grams Tab */}
				{!loading && activeTab === 'ngrams' && ngrams && (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Before words */}
						<div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6'>
							<h3 className='text-xl font-bold text-slate-800 dark:text-slate-100 mb-4'>
								Oldin keluvchi so'zlar
							</h3>
							<div className='space-y-3'>
								{ngrams.before.map((item, idx) => (
									<div
										key={idx}
										className='flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg'
									>
										<span className='font-semibold text-slate-700 dark:text-slate-300'>
											{item.text} <span className='text-emerald-600'>→</span>{' '}
											{searchTerm}
										</span>
										<span className='px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold'>
											{item.count}
										</span>
									</div>
								))}
							</div>
						</div>

						{/* After words */}
						<div className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6'>
							<h3 className='text-xl font-bold text-slate-800 dark:text-slate-100 mb-4'>
								Keyin keluvchi so'zlar
							</h3>
							<div className='space-y-3'>
								{ngrams.after.map((item, idx) => (
									<div
										key={idx}
										className='flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg'
									>
										<span className='font-semibold text-slate-700 dark:text-slate-300'>
											{searchTerm} <span className='text-emerald-600'>→</span>{' '}
											{item.text}
										</span>
										<span className='px-3 py-1 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-bold'>
											{item.count}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Book Annotation Popover - Kursor yonida */}
				{selectedBook && popoverPosition && (
					<>
						{/* Backdrop */}
						<div
							className='fixed inset-0 z-[9998]'
							onClick={() => {
								setSelectedBook(null)
								setPopoverPosition(null)
							}}
							style={{ backgroundColor: 'transparent' }}
						/>

						{/* Popover */}
						<div
							className='fixed z-[9999] bg-white dark:bg-slate-800 rounded-lg shadow-2xl border-2 border-emerald-500'
							style={{
								left: `${popoverPosition.x - 175}px`,
								top: `${popoverPosition.y + 10}px`,
								width: '350px',
								maxWidth: 'calc(100vw - 40px)',
							}}
						>
							{/* Header */}
							<div className='flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700'>
								<div className='flex items-center gap-2'>
									<BookOpen
										size={18}
										className='text-emerald-600 dark:text-emerald-400'
									/>
									<h2 className='text-sm font-bold text-slate-800 dark:text-slate-100'>
										Asar haqida
									</h2>
								</div>
								<button
									onClick={() => {
										setSelectedBook(null)
										setPopoverPosition(null)
									}}
									className='text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors'
								>
									<X size={18} />
								</button>
							</div>

							{/* Content */}
							<div className='p-4 space-y-3'>
								<h3 className='text-base font-bold text-slate-800 dark:text-slate-100'>
									{selectedBook.title}
								</h3>

								<div className='space-y-1.5 text-xs'>
									<div className='flex items-center gap-2'>
										<span className='font-semibold text-slate-500 dark:text-slate-400 w-16'>
											Muallif:
										</span>
										<span className='text-slate-800 dark:text-slate-100'>
											{selectedBook.author}
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<span className='font-semibold text-slate-500 dark:text-slate-400 w-16'>
											Yili:
										</span>
										<span className='text-slate-800 dark:text-slate-100'>
											{selectedBook.year}
										</span>
									</div>
									<div className='flex items-center gap-2'>
										<span className='font-semibold text-slate-500 dark:text-slate-400 w-16'>
											Janri:
										</span>
										<span className='px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-semibold'>
											{selectedBook.genre}
										</span>
									</div>
								</div>

								<p className='text-xs text-slate-600 dark:text-slate-300 leading-relaxed'>
									{selectedBook.description}
								</p>
							</div>

							{/* Footer */}
							<div className='p-3 border-t border-slate-200 dark:border-slate-700'>
								<a
									href={selectedBook.path}
									download={`${selectedBook.title}.pdf`}
									className='block w-full px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded text-center transition-colors text-xs'
								>
									📥 PDF ni yuklab olish
								</a>
							</div>
						</div>
					</>
				)}

				{/* Empty state */}
				{!loading && results.length === 0 && searchTerm === '' && (
					<div className='text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-xl'>
						<Search
							size={64}
							className='mx-auto text-slate-300 dark:text-slate-700 mb-4'
						/>
						<h3 className='text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2'>
							Qidiruvni boshlang
						</h3>
						<p className='text-slate-500 dark:text-slate-500'>
							Yuqoridagi qidiruvga so'z kiriting va Enter bosing
						</p>
					</div>
				)}
			</div>
		</main>
	)
}

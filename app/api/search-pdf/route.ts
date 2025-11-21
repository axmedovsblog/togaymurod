import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

// pdf-parse ni try-catch ichida yuklaymiz
let pdfParse: any = null
try {
	pdfParse = require('pdf-parse')
} catch (error) {
	console.warn('pdf-parse not available, will use fallback')
}

interface BookMetadata {
	id: string
	title: string
	author: string
	year: number
	genre: string
	path: string
	description: string
}

interface SearchResult {
	bookId: string
	bookTitle: string
	sentence: string
	context: string[]
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

// Uzbek morphology - lemmatization
function getLemmaVariants(word: string): string[] {
	const baseWord = word.toLowerCase()
	const variants = [baseWord]

	// Kengaytirilgan Oʻzbek tili qo'shimchalari
	const suffixes = [
		// Egalik qo'shimchalari
		'im', 'ing', 'i', 'si', 'miz', 'ingiz', 'lari',
		// Kelishik qo'shimchalari
		'ni', 'ga', 'da', 'dan', 'ning', 'dagi', 'dan', 'gacha',
		// Ko'plik shakli
		'lar', 'larim', 'laring', 'larini', 'lariga', 'larida', 'laridan', 'larning', 'larimiz', 'laringiz',
		// Sifatdosh shakli
		'lik', 'lilik', 'liklar', 'likni', 'likka', 'likda',
		// Nisbiy qo'shimchalar
		'chi', 'chilar', 'chining', 'chiga',
		// Salbiy shakl
		'siz', 'sizlik', 'sizlar',
		// Sifat yasovchi
		'li', 'lilar', 'lilik',
		// Ravish yasovchi
		'cha', 'day', 'dek', 'dagi', 'dagidek', 'dagicha',
		// Kichraytirish shakli
		'gina', 'ginadir', 'ginalar',
		// Qiyoslash shakli
		'roq', 'roqdir', 'roqlar',
		// Fe'l shakllari
		'man', 'san', 'dir', 'miz', 'siz', 'dilar', 'dim', 'ding', 'di', 'dik', 'dingiz', 'ishdi',
		'yotgan', 'yotir', 'yapti', 'yotibdi', 'gan', 'kan', 'yotib', 'ib', 'a', 'ydi', 'yotgan',
		// Birikma qo'shimchalar
		'niki', 'nikidan', 'nikini', 'nikiga', 'nikida',
		// Qo'shimcha kelishiklar
		'lardan', 'larga', 'larda', 'larni', 'larning', 'larigacha',
		// Ohang so'zlar uchun
		'imni', 'ingni', 'ingizni', 'mizni', 'sizni',
		'imga', 'ingga', 'mizga', 'ingizga', 'sizga',
		'imda', 'ingda', 'mizda', 'ingizda', 'sizda',
		'imdan', 'ingdan', 'mizdan', 'ingizdan', 'sizdan',
	]

	// Har bir qo'shimcha bilan variantlar yaratish
	suffixes.forEach((suffix) => {
		variants.push(baseWord + suffix)
	})

	// Ildiz so'zni topish (qo'shimchalarni olib tashlash)
	suffixes.forEach((suffix) => {
		if (baseWord.endsWith(suffix) && baseWord.length > suffix.length + 2) {
			const root = baseWord.slice(0, -suffix.length)
			variants.push(root)
			
			// Ildizdan yangi shakllar yasash
			suffixes.forEach((newSuffix) => {
				variants.push(root + newSuffix)
			})
		}
	})

	// Takrorlanmaslik uchun unique qilish
	return [...new Set(variants)]
}

// Extract sentences from text
function extractSentences(text: string): string[] {
	return text
		.split(/[.!?]+/)
		.map((s) => s.trim())
		.filter((s) => s.length > 10)
}

// Get 5-sentence context
function getContext(sentences: string[], index: number): string[] {
	const start = Math.max(0, index - 2)
	const end = Math.min(sentences.length, index + 3)
	return sentences.slice(start, end)
}

// Calculate N-grams
function calculateNGrams(results: SearchResult[], searchWord: string): NGram {
	const beforeWords: { [key: string]: number } = {}
	const afterWords: { [key: string]: number } = {}

	results.forEach((result) => {
		const words = result.sentence.split(/\s+/)
		const searchIndex = words.findIndex((w) =>
			w.toLowerCase().includes(searchWord.toLowerCase())
		)

		if (searchIndex > 0) {
			const before = words[searchIndex - 1].replace(/[.,!?;:"'«»]/g, '').toLowerCase()
			if (before.length > 1) {
				beforeWords[before] = (beforeWords[before] || 0) + 1
			}
		}

		if (searchIndex < words.length - 1) {
			const after = words[searchIndex + 1].replace(/[.,!?;:"'«»]/g, '').toLowerCase()
			if (after.length > 1) {
				afterWords[after] = (afterWords[after] || 0) + 1
			}
		}
	})

	const sortByCount = (obj: { [key: string]: number }) =>
		Object.entries(obj)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 15)
			.map(([text, count]) => ({ text, count }))

	return {
		before: sortByCount(beforeWords),
		after: sortByCount(afterWords),
	}
}

export async function POST(request: NextRequest) {
	try {
		const { searchTerm } = await request.json()

		if (!searchTerm || searchTerm.trim().length === 0) {
			return NextResponse.json({ error: 'Search term required' }, { status: 400 })
		}

		// Check if pdf-parse is available
		if (!pdfParse || typeof pdfParse !== 'function') {
			// Return demo/mock results if pdf-parse not available
			const lemmaVariants = getLemmaVariants(searchTerm)
			
			const mockResults: SearchResult[] = [
				{
					bookId: 'yulduzlar-mangu-yonadi',
					bookTitle: 'Yulduzlar mangu yonadi',
					sentence: `Kechqurun bo'ldi. U ${searchTerm}ning ma'nosini chuqur his qildi.`,
					context: [
						'Kun botayotgan edi.',
						'Osmon rangi o\'zgarib borardi.',
						`Kechqurun bo'ldi. U ${searchTerm}ning ma'nosini chuqur his qildi.`,
						'Bu voqea unga yangi tafakkur berdi.',
						'Ertaga yangi kun boshlanadi.',
					],
					lemmaVariants,
				},
				{
					bookId: 'oydinda-yurgan-odamlar',
					bookTitle: 'Oydinda yurgan odamlar',
					sentence: `Bobo qadimgi ${searchTerm} haqida hikoya qildi.`,
					context: [
						'Oila yig\'ildi.',
						'Bobo o\'z joyida o\'tirdi.',
						`Bobo qadimgi ${searchTerm} haqida hikoya qildi.`,
						'Bolalar diqqat bilan tinglashardi.',
						'Hikoya juda qiziqarli edi.',
					],
					lemmaVariants,
				},
				{
					bookId: 'momo-yer-qoshigi',
					bookTitle: 'Momo Yer qo\'shig\'i',
					sentence: `Tabiat va ${searchTerm} o'rtasidagi aloqa ajoyib edi.`,
					context: [
						'Bahor keldi.',
						'Daraxtlar gulladi.',
						`Tabiat va ${searchTerm} o'rtasidagi aloqa ajoyib edi.`,
						'Qushlar sayraydi.',
						'Havo toza va musaffo.',
					],
					lemmaVariants,
				},
			]

			const mockStatistics: Statistics[] = [
				{
					bookId: 'yulduzlar-mangu-yonadi',
					bookTitle: 'Yulduzlar mangu yonadi',
					count: 15,
					percentage: 50,
				},
				{
					bookId: 'oydinda-yurgan-odamlar',
					bookTitle: 'Oydinda yurgan odamlar',
					count: 10,
					percentage: 33,
				},
				{
					bookId: 'momo-yer-qoshigi',
					bookTitle: 'Momo Yer qo\'shig\'i',
					count: 5,
					percentage: 17,
				},
			]

			const mockNgrams = calculateNGrams(mockResults, searchTerm)

			return NextResponse.json({
				results: mockResults,
				statistics: mockStatistics,
				ngrams: mockNgrams,
				totalCount: 30,
				lemmaVariants,
				note: 'Demo ma\'lumotlar (pdf-parse o\'rnatilmagan)',
			})
		}

		// Load books metadata
		const metadataPath = path.join(process.cwd(), 'public', 'books-metadata.json')
		const metadataContent = fs.readFileSync(metadataPath, 'utf-8')
		const metadata = JSON.parse(metadataContent)
		const books: BookMetadata[] = metadata.books

		// Get lemma variants
		const lemmaVariants = getLemmaVariants(searchTerm)
		console.log(`Qidiruv uchun ${lemmaVariants.length} ta variant yaratildi`)
		
		// Regex o'rniga to'g'ridan-to'g'ri so'zlarni solishtirish
		const lemmaVariantsLower = new Set(lemmaVariants.map(v => v.toLowerCase()))

		const allResults: SearchResult[] = []
		const bookCounts: { [key: string]: number } = {}
		const foundVariants = new Set<string>() // Haqiqiy topilgan shakllar

		// Search in each PDF
		for (const book of books) {
			try {
				// Try multiple possible paths
				const possiblePaths = [
					path.join(process.cwd(), 'public', book.path),
					path.join(process.cwd(), 'public', 'pdfs', `${book.id}.pdf`),
					path.join(process.cwd(), 'public', 'docs', `${book.title}.pdf`),
				]

				let pdfPath = ''
				for (const p of possiblePaths) {
					if (fs.existsSync(p)) {
						pdfPath = p
						break
					}
				}

				if (!pdfPath) {
					console.log(`PDF not found for ${book.title}`)
					continue
				}

				const dataBuffer = fs.readFileSync(pdfPath)
				const pdfData = await pdfParse(dataBuffer)
				const text = pdfData.text

				// Extract sentences
				const sentences = extractSentences(text)

				// Find matching sentences
				sentences.forEach((sentence, index) => {
					// Gapni so'zlarga ajratish
					const words = sentence.toLowerCase().split(/\s+/)
					
					// Har bir so'zni tinish belgilarisiz tekshirish
					let hasMatch = false
					words.forEach((word) => {
						const cleanWord = word.replace(/[.,!?;:"'«»\-—()]/g, '')
						if (cleanWord && lemmaVariantsLower.has(cleanWord)) {
							hasMatch = true
							foundVariants.add(cleanWord)
						}
					})
					
					if (hasMatch) {
						const context = getContext(sentences, index)
						allResults.push({
							bookId: book.id,
							bookTitle: book.title,
							sentence,
							context,
							lemmaVariants,
						})

						bookCounts[book.id] = (bookCounts[book.id] || 0) + 1
					}
				})
			} catch (error) {
				console.error(`Error processing ${book.title}:`, error)
			}
		}

		// Calculate statistics
		const totalCount = Object.values(bookCounts).reduce((sum, count) => sum + count, 0)
		const statistics: Statistics[] = Object.entries(bookCounts)
			.map(([bookId, count]) => {
				const book = books.find((b) => b.id === bookId)
				return {
					bookId,
					bookTitle: book?.title || bookId,
					count,
					percentage: Math.round((count / totalCount) * 100),
				}
			})
			.sort((a, b) => b.count - a.count)

		// Convert found variants to sorted array (5-10 ta orasida)
		let actualVariants = Array.from(foundVariants).sort()
		
		// Agar juda ko'p bo'lsa, eng ko'p uchraganlarini qoldirish
		if (actualVariants.length > 10) {
			// Har bir variantning chastotasini hisoblash
			const variantCounts: { [key: string]: number } = {}
			actualVariants.forEach(variant => {
				variantCounts[variant] = 0
			})
			
			// Necha marta uchraganini sanash
			allResults.forEach(result => {
				const words = result.sentence.toLowerCase().split(/\s+/)
				words.forEach(word => {
					const cleanWord = word.replace(/[.,!?;:"'«»\-—()]/g, '')
					if (variantCounts.hasOwnProperty(cleanWord)) {
						variantCounts[cleanWord]++
					}
				})
			})
			
			// Eng ko'p uchraganlari bo'yicha saralash va 10 tasini olish
			actualVariants = Object.entries(variantCounts)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 10)
				.map(([variant]) => variant)
		}

		// Calculate N-grams
		const ngrams = calculateNGrams(allResults, searchTerm)

		return NextResponse.json({
			results: allResults,
			statistics,
			ngrams,
			totalCount,
			lemmaVariants: actualVariants, // Haqiqiy topilgan shakllar
			actualVariants, // Qo'shimcha ma'lumot uchun
		})
	} catch (error) {
		console.error('Search error:', error)
		return NextResponse.json(
			{ error: 'Internal server error', details: String(error) },
			{ status: 500 }
		)
	}
}

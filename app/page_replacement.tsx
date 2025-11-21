'use client'

import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navigation from '@/components/navigation'
import SearchCorpus from '@/components/search-corpus'
import { useEffect, useState } from 'react'

export default function Home() {
	const [currentPage, setCurrentPage] = useState<
		'home' | 'biography' | 'works' | 'corpus'
	>('home')
	const [isDarkMode, setIsDarkMode] = useState(false)

	// Check for saved theme preference or default to light mode
	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		const prefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches

		if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
			setIsDarkMode(true)
			document.documentElement.classList.add('dark')
		} else {
			setIsDarkMode(false)
			document.documentElement.classList.remove('dark')
		}
	}, [])

	const toggleDarkMode = () => {
		const newMode = !isDarkMode
		setIsDarkMode(newMode)

		if (newMode) {
			document.documentElement.classList.add('dark')
			localStorage.setItem('theme', 'dark')
		} else {
			document.documentElement.classList.remove('dark')
			localStorage.setItem('theme', 'light')
		}
	}

	const handlePageChange = (
		page: 'home' | 'biography' | 'works' | 'corpus'
	) => {
		setCurrentPage(page)
		// Smooth scroll to top when changing pages
		setTimeout(() => {
			const scrollContainer = document.querySelector('.page-scroll-container')
			if (scrollContainer) {
				scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
			}
		}, 100)
	}

	const BiographyPage = () => (
		<div className='page-scroll-container min-h-screen overflow-y-auto bg-linear-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20'>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20'>
				{/* Hero Section */}
				<div className='text-center mb-16'>
					<div className='inline-block p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-6'>
						<div className='text-6xl'>✍️</div>
					</div>
					<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-6'>
						Tog'ay Murod
					</h1>
					<p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed'>
						O'zbek adabiyotining nufuzli vakili, qissa va roman muallifi
					</p>
				</div>

				{/* Main Biography Content - Side by Side Layout */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16'>
					{/* Photo Column */}
					<div className='flex justify-center lg:justify-start'>
						<div className='relative w-80 h-96 lg:w-96 lg:h-[500px]'>
							{/* Background Decoration */}
							<div className='absolute inset-0 bg-linear-to-br from-emerald-200 via-teal-100 to-cyan-200 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-800 rounded-3xl shadow-2xl transform rotate-3'></div>
							{/* Photo Container */}
							<div className='relative w-full h-full bg-white dark:bg-slate-800 rounded-3xl p-6 border-4 border-emerald-200 dark:border-emerald-700 flex items-center justify-center overflow-hidden shadow-2xl'>
								<img
									src='/placeholder-user.jpg'
									alt="Tog'ay Murod"
									className='w-full h-full object-cover rounded-2xl shadow-xl'
									onError={e => {
										const target = e.target as HTMLImageElement
										target.style.display = 'none'
										const fallback =
											target.parentElement?.querySelector('.fallback-photo')
										if (fallback) {
											fallback.classList.remove('hidden')
											fallback.classList.add('flex')
										}
									}}
								/>
								{/* Fallback when image not found */}
								<div className='fallback-photo hidden w-full h-full flex-col items-center justify-center text-center bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl'>
									<div className='text-8xl mb-6'>👨‍💼</div>
									<h3 className='text-2xl font-bold text-emerald-700 dark:text-emerald-300'>
										Tog'ay Murod
									</h3>
									<p className='text-emerald-600 dark:text-emerald-400 text-lg mt-2'>
										Yozuvchi
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Biography Text Column */}
					<div className='space-y-8'>
						{/* Birth and Education */}
						<div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-xl'>
							<h3 className='text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-3'>
								<span className='text-3xl'>🎓</span>
								Hayoti va ta'limi
							</h3>
							<div className='space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed'>
								<p className='text-lg'>
									<strong>Tog'ay Murod</strong> 1930-yil 15-martda Toshkent
									viloyati, Quyichirchiq tumanida tug'ildi. Haqiqiy ismi -{' '}
									<em>Murodxo'ja Tog'ayev</em>.
								</p>
								<p>
									Dastlabki ta'limini ona yurtida oldi. Keyinchalik Toshkent
									davlat universitetining filologiya fakultetini tamomladi.
									Talaba bo'lgan davridan boshlab adabiyot va jurnalistika
									sohasida faoliyat yuritdi.
								</p>
							</div>
						</div>

						{/* Career */}
						<div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-xl'>
							<h3 className='text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-3'>
								<span className='text-3xl'>💼</span>
								Faoliyati
							</h3>
							<div className='space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed'>
								<p>
									Tog'ay Murod o'z ijod faoliyatini 1950-yillardan boshladi.
									Dastlab "Yoshlik" jurnalida ishladi, so'ngra "O'zbekiston
									adabiyoti va san'ati" gazetasida adabiy tanqidchi vazifasini
									bajardi.
								</p>
								<p>
									U qissa va roman janrlarida qalam tebratgan bo'lib, asarlarida
									o'zbek xalqining milliy qadriyatlari, an'analari va zamonaviy
									hayot masalalarini aks ettirgan.
								</p>
							</div>
						</div>

						{/* Literary Work */}
						<div className='bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl p-8 border-4 border-emerald-200 dark:border-emerald-700 shadow-xl'>
							<h3 className='text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-3'>
								<span className='text-3xl'>📚</span>
								Adabiy merosi
							</h3>
							<div className='space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed'>
								<p>
									Tog'ay Murodning eng mashhur asarlari orasida "Yulduzlar mangu
									yonadi", "Odam va tabiat", "Tong nafasi" kabi qissalar
									to'plamini keltirish mumkin.
								</p>
								<p>
									Uning asarlarida insoniy fazilatlar, vatanparvarlik, tabiat
									muhabbati kabi mavzular muhim o'rin tutadi. Yozuvchi o'zbek
									tilining boyligi va go'zalligini o'z asarlarida mukammal
									tarzda namoyon etgan.
								</p>
								<p>
									Tog'ay Murod zamonaviy o'zbek adabiyotining yetuk vakili
									sifatida o'z ijodi bilan ko'plab o'quvchilarning qalbini zabt
									etgan.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)

	const WorksPage = () => {
		const [selectedBook, setSelectedBook] = useState<number | null>(null)

		// Books data with real PDF paths
		const books = [
			{
				id: 1,
				title: 'Yulduzlar mangu yonadi',
				category: 'Qissalar',
				year: '1970',
				description:
					"Ushbu to'plamda Tog'ay Murodning eng sara qissalari jamlangan. Har bir qissa insoniy fazilatlar, vatanparvarlik va hayotning ma'nosi haqida chuqur fikrlarni o'z ichiga oladi.",
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Yulduzlar mangu yonadi (qissalar).pdf",
			},
			{
				id: 2,
				title: 'Tong nafasi',
				category: 'Qissa',
				year: '1975',
				description:
					"Yozuvchining eng ta'sirli asarlaridan biri. Inson va tabiat, mehr va sadoqat mavzularini poetik tarzda yoritgan asar.",
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Tong nafasi.pdf",
			},
			{
				id: 3,
				title: 'Odam va tabiat',
				category: 'Hikoyalar',
				year: '1973',
				description:
					"Tabiat va inson o'rtasidagi munosabatlarni tasvirlovchi hikoyalar to'plami. Ekologik ong va tabiatni asrash g'oyalari aks etgan.",
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Odam va tabiat.pdf",
			},
			{
				id: 4,
				title: 'Bahor gulları',
				category: "She'rlar",
				year: '1968',
				description:
					"Tog'ay Murodning she'riy ijodining eng yaxshi namunalari. Vatan, tabiat va insoniy sevgi mavzularidagi lirik asarlar.",
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Bahor gulları.pdf",
			},
			{
				id: 5,
				title: 'Chinor soyasi',
				category: 'Roman',
				year: '1978',
				description:
					"Yozuvchining eng katta asari. O'zbek oilasining turmush tarzi, an'analari va zamonaviy o'zgarishlar tasvirlangan.",
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Chinor soyasi.pdf",
			},
			{
				id: 6,
				title: 'Dala gullari',
				category: 'Bolalar adabiyoti',
				year: '1972',
				description:
					"Bolalar uchun yozilgan qissalar to'plami. Axloqiy tarbiya, do'stlik va halollik mavzularida yozilgan.",
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Dala gullari.pdf",
			},
			{
				id: 7,
				title: 'Hayot darslari',
				category: 'Publitsistika',
				year: '1980',
				description:
					'Yozuvchining hayotiy tajribasi va kuzatishlari asosida yozilgan publitsistik asarlar. Jamiyat va shaxs masalalari muhokama qilingan.',
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Hayot darslari.pdf",
			},
			{
				id: 8,
				title: 'Sevgi qissalari',
				category: 'Qissalar',
				year: '1976',
				description:
					"Sevgi, oila va insoniy munosabatlar mavzusidagi eng ta'sirli qissalar. Yozuvchining ijodiy kamolotining yana bir namunasi.",
				cover: '/placeholder.jpg',
				pdf: "/docs/Tog'ay Murod. Sevgi qissalari.pdf",
			},
		]

		return (
			<div className='page-scroll-container min-h-screen overflow-y-auto bg-linear-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20'>
				<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20'>
					{/* Header */}
					<div className='text-center mb-16'>
						<div className='inline-block p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mb-6'>
							<div className='text-6xl'>📚</div>
						</div>
						<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-6'>
							Tog'ay Murodning asarlari
						</h1>
						<p className='text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed'>
							Yozuvchining barcha asarlarini PDF formatida yuklab oling va
							o'qing. Har bir kitob o'zbek adabiyotining qimmatli merosi
							hisoblanadi.
						</p>
					</div>

					{/* Books Grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16'>
						{books.map(book => (
							<div
								key={book.id}
								onClick={() => setSelectedBook(book.id)}
								className='group cursor-pointer transform hover:scale-105 transition-all duration-300'
							>
								<div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl border-2 border-emerald-100 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300'>
									{/* Book Cover */}
									<div className='aspect-3/4 bg-linear-to-br from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 rounded-xl border-2 border-emerald-200/50 dark:border-emerald-700/50 mb-4 flex items-center justify-center overflow-hidden relative'>
										<img
											src={book.cover}
											alt={book.title}
											className='w-full h-full object-cover'
											onError={e => {
												const target = e.target as HTMLImageElement
												target.style.display = 'none'
												const fallback =
													target.parentElement?.querySelector('.fallback-cover')
												if (fallback) {
													fallback.classList.remove('hidden')
													fallback.classList.add('flex')
												}
											}}
										/>
										{/* Fallback design when image not found */}
										<div className='fallback-cover hidden w-full h-full flex-col items-center justify-center p-4 text-center'>
											<div className='text-4xl mb-3'>📖</div>
											<h3 className='text-sm font-bold text-emerald-700 dark:text-emerald-300 leading-tight mb-2'>
												{book.title}
											</h3>
											<p className='text-emerald-600 dark:text-emerald-400 text-xs font-medium'>
												{book.year} yil
											</p>
											<p className='text-emerald-500 dark:text-emerald-500 text-xs mt-1'>
												{book.category}
											</p>
										</div>

										{/* Hover Overlay */}
										<div className='absolute inset-0 bg-emerald-600/90 dark:bg-emerald-700/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
											<div className='text-white text-center'>
												<div className='text-3xl mb-2'>👁️</div>
												<p className='font-bold text-sm'>Ko'rish</p>
											</div>
										</div>
									</div>

									{/* Book Info */}
									<div className='space-y-3'>
										<h3 className='font-bold text-slate-800 dark:text-slate-100 text-lg leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300'>
											{book.title}
										</h3>

										<div className='flex items-center justify-between'>
											<span className='px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full'>
												{book.category}
											</span>
											<span className='text-slate-500 dark:text-slate-400 text-sm font-medium'>
												{book.year} yil
											</span>
										</div>

										<p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3'>
											{book.description}
										</p>

										{/* Action Button */}
										<div className='pt-2'>
											<div className='w-full bg-emerald-50 dark:bg-emerald-900/30 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 py-2 px-4 rounded-lg text-sm font-bold text-center transition-all duration-300 border border-emerald-200 dark:border-emerald-700'>
												O'qish va yuklab olish
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Full Screen Modal for Selected Book */}
					{selectedBook && (
						<>
							{/* Modal Overlay */}
							<div className='fixed inset-0 bg-black/80 backdrop-blur-md z-40 animate-in fade-in duration-300'></div>

							{/* Full Screen Modal */}
							<div className='fixed inset-0 z-50 animate-in fade-in duration-500'>
								{books
									.filter(book => book.id === selectedBook)
									.map(book => (
										<div
											key={book.id}
											className='h-full w-full bg-white dark:bg-slate-900 overflow-y-auto'
										>
											{/* Modal Header */}
											<div className='sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 border-b-2 border-emerald-200 dark:border-emerald-700 z-20 shadow-lg'>
												<div className='max-w-7xl mx-auto flex items-center justify-between'>
													<div className='flex items-center gap-4'>
														<h1 className='text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100'>
															{book.title}
														</h1>
														<span className='px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold rounded-full'>
															{book.year} yil
														</span>
													</div>
													<button
														onClick={() => setSelectedBook(null)}
														className='w-12 h-12 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/70 transition-all duration-200 text-2xl font-bold shadow-lg hover:shadow-xl'
													>
														×
													</button>
												</div>
											</div>

											{/* Modal Content */}
											<div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20 py-8'>
												<div className='max-w-7xl mx-auto px-6 lg:px-8'>
													<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
														{/* Book Cover */}
														<div className='flex justify-center lg:justify-start'>
															<div className='relative w-80 h-[500px] lg:w-96 lg:h-[600px]'>
																<div className='absolute inset-0 bg-linear-to-br from-emerald-200 via-teal-100 to-cyan-200 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-800 rounded-3xl shadow-2xl'></div>
																<div className='relative w-full h-full bg-white dark:bg-slate-800 rounded-3xl p-6 border-4 border-emerald-200 dark:border-emerald-700 flex items-center justify-center overflow-hidden shadow-2xl'>
																	<img
																		src={book.cover}
																		alt={book.title}
																		className='w-full h-full object-cover rounded-2xl shadow-xl'
																		onError={e => {
																			const target =
																				e.target as HTMLImageElement
																			target.style.display = 'none'
																			const fallback =
																				target.parentElement?.querySelector(
																					'.fallback-cover'
																				)
																			if (fallback) {
																				fallback.classList.remove('hidden')
																				fallback.classList.add('flex')
																			}
																		}}
																	/>
																	<div className='fallback-cover absolute inset-0 w-full h-full hidden flex-col items-center justify-center text-center bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl p-8'>
																		<div className='text-8xl mb-6'>📚</div>
																		<h3 className='text-2xl font-bold text-emerald-700 dark:text-emerald-300 leading-tight mb-4'>
																			{book.title}
																		</h3>
																		<p className='text-emerald-600 dark:text-emerald-400 text-lg font-medium'>
																			{book.year} yil
																		</p>
																		<p className='text-emerald-500 dark:text-emerald-500 text-base mt-2'>
																			{book.category}
																		</p>
																	</div>
																</div>
															</div>
														</div>

														{/* Book Information */}
														<div className='space-y-8'>
															<div className='flex flex-wrap items-center gap-4'>
																<span className='px-6 py-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-lg font-bold rounded-full border-4 border-emerald-200 dark:border-emerald-700 shadow-lg'>
																	{book.category}
																</span>
																<span className='px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-lg font-semibold rounded-full shadow-md'>
																	{book.year} yil
																</span>
															</div>

															<div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-xl'>
																<h4 className='text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3'>
																	<span className='text-3xl'>📖</span>
																	Asar haqida
																</h4>
																<p className='text-slate-700 dark:text-slate-300 leading-relaxed text-justify text-lg lg:text-xl'>
																	{book.description}
																</p>
															</div>

															<div className='bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl p-8 border-4 border-emerald-200 dark:border-emerald-700 shadow-xl'>
																<h3 className='text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-3'>
																	<span className='text-3xl'>📥</span>
																	Elektron kitobni yuklab oling
																</h3>
																<p className='text-slate-600 dark:text-slate-400 text-base lg:text-lg mb-6 leading-relaxed'>
																	Ushbu asarni PDF formatida bepul yuklab olib,
																	istalgan vaqtda o'qishingiz mumkin. Tog'ay
																	Murodning asl asarlaridan zavqlaning!
																</p>
																<a
																	href={book.pdf}
																	download={book.title + '.pdf'}
																	className='inline-flex items-center gap-4 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg lg:text-xl'
																>
																	<span className='text-2xl'>⬇️</span>
																	PDF yuklab olish ({book.category})
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									))}
							</div>
						</>
					)}
				</main>
			</div>
		)
	}

	const CorpusPage = () => (
		<div className='page-scroll-container min-h-screen overflow-y-auto bg-linear-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20'>
			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20'>
				<SearchCorpus />
			</main>
		</div>
	)

	return (
		<div className='min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300'>
			<Navigation
				currentPage={currentPage}
				onPageChange={handlePageChange}
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
			/>

			{currentPage === 'home' && <Hero onNavigate={handlePageChange} />}
			{currentPage === 'biography' && <BiographyPage />}
			{currentPage === 'works' && <WorksPage />}
			{currentPage === 'corpus' && <CorpusPage />}

			<Footer />
		</div>
	)
}

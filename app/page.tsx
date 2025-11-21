'use client'

import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navigation from '@/components/navigation'
import SearchCorpusAdvanced from '@/components/search-corpus-advanced'
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

	return (
		<div className='min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex flex-col relative overflow-hidden'>
			{/* Animated background elements */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse'></div>
				<div className='absolute -bottom-40 -left-40 w-96 h-96 bg-linear-to-br from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-linear-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-2xl animate-bounce slow'></div>
			</div>

			<Navigation
				currentPage={currentPage}
				onPageChange={handlePageChange}
				isDarkMode={isDarkMode}
				toggleDarkMode={toggleDarkMode}
			/>

			<div className='flex-1 relative z-10 overflow-hidden'>
				<div className='h-full overflow-y-auto scroll-smooth page-scroll-container'>
					<div
						className={`min-h-full transition-all duration-500 ease-in-out ${
							currentPage === 'home'
								? 'opacity-100 translate-x-0'
								: currentPage === 'biography'
								? 'opacity-100 translate-x-0'
								: currentPage === 'works'
								? 'opacity-100 translate-x-0'
								: 'opacity-100 translate-x-0'
						}`}
					>
						{currentPage === 'home' && (
							<div className='animate-in fade-in slide-in-from-bottom duration-500'>
								<HomePage onNavigate={setCurrentPage} />
							</div>
						)}
						{currentPage === 'biography' && (
							<div className='animate-in fade-in slide-in-from-right duration-500'>
								<Biography />
							</div>
						)}
						{currentPage === 'works' && (
							<div className='animate-in fade-in slide-in-from-left duration-500'>
								<Works />
							</div>
						)}
						{currentPage === 'corpus' && (
							<div className='animate-in fade-in slide-in-from-top duration-500'>
								<SearchCorpusAdvanced />
							</div>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}

function HomePage({
	onNavigate,
}: {
	onNavigate: (page: 'home' | 'biography' | 'works' | 'corpus') => void
}) {
	return (
		<div className='relative'>
			{/* Hero Section */}
			<Hero onNavigate={onNavigate} />

			{/* Features Section */}
			<section className='py-20 bg-gradient-to-r from-white via-emerald-50/30 to-teal-50/30 dark:from-slate-900 dark:via-emerald-950/20 dark:to-teal-950/20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6'>
							Adabiy dunyo
						</h2>
						<p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto'>
							Tog'ay Murodning ijod dunyosi bilan tanishing va uning noyob
							asarlarini kashf eting
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Biography Card */}
						<div
							className='group cursor-pointer'
							onClick={() => onNavigate('biography')}
						>
							<div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-emerald-100 dark:border-emerald-800 transform hover:scale-105 transition-all duration-300'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
										<span className='text-3xl'>👤</span>
									</div>
									<h3 className='text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4'>
										Tarjimayi hol
									</h3>
									<p className='text-slate-600 dark:text-slate-300 leading-relaxed mb-6'>
										Yozuvchining hayoti, ta'limi va ijod yo'li haqida batafsil
										ma'lumot
									</p>
									<div className='text-emerald-600 dark:text-emerald-400 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300'>
										Batafsil o'qish →
									</div>
								</div>
							</div>
						</div>

						{/* Works Card */}
						<div
							className='group cursor-pointer'
							onClick={() => onNavigate('works')}
						>
							<div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-emerald-100 dark:border-emerald-800 transform hover:scale-105 transition-all duration-300'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
										<span className='text-3xl'>📚</span>
									</div>
									<h3 className='text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4'>
										Asarlari
									</h3>
									<p className='text-slate-600 dark:text-slate-300 leading-relaxed mb-6'>
										Barcha qissalar, romanlar va tarjimalarni PDF formatida
										yuklab oling
									</p>
									<div className='text-emerald-600 dark:text-emerald-400 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300'>
										Asarlarni ko'rish →
									</div>
								</div>
							</div>
						</div>

						{/* Corpus Card */}
						<div
							className='group cursor-pointer'
							onClick={() => onNavigate('corpus')}
						>
							<div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-emerald-100 dark:border-emerald-800 transform hover:scale-105 transition-all duration-300'>
								<div className='text-center'>
									<div className='w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
										<span className='text-3xl'>🔍</span>
									</div>
									<h3 className='text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4'>
										Korpus
									</h3>
									<p className='text-slate-600 dark:text-slate-300 leading-relaxed mb-6'>
										Asarlardagi so'z va iboralarni qidiring va tahlil qiling
									</p>
									<div className='text-emerald-600 dark:text-emerald-400 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300'>
										Qidirishni boshlash →
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Statistics Section */}
			<section className='py-20 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
						<div className='text-center'>
							<div className='text-4xl sm:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2'>
								8+
							</div>
							<div className='text-slate-600 dark:text-slate-300 font-medium'>
								Nashr etilgan kitoblar
							</div>
						</div>
						<div className='text-center'>
							<div className='text-4xl sm:text-5xl font-bold text-teal-600 dark:text-teal-400 mb-2'>
								50+
							</div>
							<div className='text-slate-600 dark:text-slate-300 font-medium'>
								Yozilgan qissalar
							</div>
						</div>
						<div className='text-center'>
							<div className='text-4xl sm:text-5xl font-bold text-cyan-600 dark:text-cyan-400 mb-2'>
								25+
							</div>
							<div className='text-slate-600 dark:text-slate-300 font-medium'>
								Ijod yillari
							</div>
						</div>
						<div className='text-center'>
							<div className='text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
								1000+
							</div>
							<div className='text-slate-600 dark:text-slate-300 font-medium'>
								Sahifalar
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Popular Works Section */}
			<section className='py-20'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6'>
							Mashhur asarlar
						</h2>
						<p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8'>
							Eng ko'p o'qilgan va sevimli asarlar bilan tanishing
						</p>

						<div className='text-center mb-12'>
							<button
								onClick={() => onNavigate('works')}
								className='px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300'
							>
								<span className='flex items-center gap-3'>
									<span>Barcha asarlarni ko'rish</span>
									<span className='text-xl'>→</span>
								</span>
							</button>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[
							{
								title: 'Yulduzlar mangu yonadi',
								year: '1976',
								type: 'Qissalar',
								description:
									"Tog'ay Murodning debyut qissasi bo'lib, unda yosh avlodning hayotga bo'lgan intilishlari tasvirlangan.",
							},
							{
								title: 'Oydinda yurgan odamlar',
								year: '1980',
								type: 'Qissa',
								description:
									"Oybek nomidagi mukofot sovrindori bo'lgan bu asar insoniy his-tuyg'ularni nozik tasvirlaydi.",
							},
							{
								title: "Momo Yer qo'shig'i",
								year: '1985',
								type: 'Qissa',
								description:
									"Ona Yer va insoniyat o'rtasidagi munosabatlar poetik tilda bayon qilingan.",
							},
						].map((book, index) => (
							<div
								key={index}
								className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl border border-emerald-100 dark:border-emerald-800 transform hover:scale-105 transition-all duration-300 cursor-pointer'
								onClick={() => onNavigate('works')}
							>
								<div className='flex items-start justify-between mb-4'>
									<div className='text-2xl'>📖</div>
									<span className='text-sm text-emerald-600 dark:text-emerald-400 font-semibold px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full'>
										{book.year}
									</span>
								</div>
								<h3 className='text-xl font-bold text-slate-800 dark:text-slate-100 mb-2'>
									{book.title}
								</h3>
								<p className='text-sm text-teal-600 dark:text-teal-400 font-medium mb-3'>
									{book.type}
								</p>
								<p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed'>
									{book.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

function Biography() {
	return (
		<main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20'>
			<div className='space-y-8'>
				{/* Hero Header - Side by Side Layout */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start'>
					{/* Photo Section - Left Side */}
					<div className='lg:col-span-1 flex justify-center lg:justify-start'>
						<div className='relative'>
							<div className='absolute inset-0 bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-xl'></div>
							<div className='relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[400px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-4 border border-white/50 dark:border-slate-600/50 shadow-2xl'>
								<img
									src='/img/togaymurod.png'
									alt="Tog'ay Murod"
									className='w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500'
								/>
								<div className='absolute inset-0 rounded-2xl bg-linear-to-t from-slate-900/20 via-transparent to-transparent'></div>
							</div>
						</div>
					</div>

					{/* Text Content - Right Side */}
					<div className='lg:col-span-2 text-center lg:text-left space-y-6'>
						{/* Name and Title */}
						<div className='relative inline-block'>
							<h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 text-balance'>
								Tog'ay Murod
							</h1>
							<div className='absolute -inset-2 bg-linear-to-r from-indigo-600/20 via-purple-600/20 to-blue-600/20 blur-lg rounded-lg opacity-30 animate-pulse'></div>
						</div>

						{/* Life Dates */}
						<p className='text-2xl font-medium text-slate-600 dark:text-slate-300 mb-4'>
							(1948-2003)
						</p>

						{/* Basic Info */}
						<div className='max-w-md mx-auto lg:mx-0 mb-6 space-y-2 text-sm text-slate-500 dark:text-slate-400'>
							<p>
								<span className='font-medium'>Tug'ilgan joy:</span> Surxondaryo
							</p>
							<p>
								<span className='font-medium'>Yo'nalishlar:</span> Yozuvchi,
								tarjimon
							</p>
						</div>

						{/* Decorative Lines */}
						<div className='flex justify-center lg:justify-start space-x-2'>
							<div className='w-16 h-1 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse'></div>
							<div className='w-8 h-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-full animate-pulse delay-300'></div>
							<div className='w-4 h-1 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse delay-500'></div>
						</div>

						{/* Short Introduction Text */}
						<div className='text-left'>
							<p className='text-lg text-slate-600 dark:text-slate-300 leading-relaxed'>
								O'zbek adabiyotining nufuzli vakili, "O'zbekiston xalq
								yozuvchisi" unvoniga ega bo'lgan Tog'ay Murod o'zining chuqur
								falsafiy asarlari va mukammal tarjimonlik faoliyati bilan
								tanilgan.
							</p>
						</div>
					</div>
				</div>

				{/* Main Content Card */}
				<div className='relative'>
					<div className='absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl blur-xl'></div>
					<div className='relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]'>
						<div className='prose prose-lg max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-justify space-y-6'>
							<p className='animate-in fade-in duration-700 delay-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'>
								Tog'ay Murod (1948-2003) — uning asl ism-sharifi Tog'aymurod
								Mengnorov bo'lib, Tog'ay Murod adabiy tahallusidir. U 1948 yilda
								Surxondaryo viloyati Denov tumanining Xo'ja Soat qishlog'ida
								dunyoga kelgan. O'rta maktabni 1966 yilda tugatib, Toshkent
								Davlat universitetining jurnalistika fakultetida tahsil olgan.
								1994 yil yozuvchi Abdulla Qodiriy nomidagi Respublika mukofoti
								sovrindori bo'lgan, 1999 yil unga 'O'zbekiston xalq yozuvchisi'
								unvoni topshirilgan.
							</p>

							<p className='animate-in fade-in duration-700 delay-700 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'>
								Tog'ay Murod respublika radiosida muharrir (1972-1976),
								'O'zbekiston jismoniy tarbiyachisi' gazetasida tarjimon
								(1976-1978), 'Fan va turmush' jurnalida bo'lim boshlig'i bo'lib
								ishlagan (1982-1984). 1985-1987 yillar Moskvadagi adabiyot
								institutida tahsil olgan.
							</p>

							<p className='animate-in fade-in duration-700 delay-1000 hover:text-slate-900 dark:hover:text-slate-100 transition-colors'>
								Ilk qissasi - 'Yulduzlar mangu yonadi' (1976) orqali kitobxonlar
								orasida yetuk, o'ziga xos yozuvchi sifatida tanilgan. Tog'ay
								Murodning har bir yangi asari respublikaning adabiy hayotida
								muhim voqeaga aylanadi: 'Ot kishnagan oqshom' (1979), 'Oydinda
								yurgan odamlar' (1980) va 'Momo Yer qo'shig'i' (1985).
							</p>

							<p className='animate-in fade-in duration-700 delay-[1200ms] hover:text-slate-900 dark:hover:text-slate-100 transition-colors'>
								'Oydinda yurgan odamlar' qissasi uchun Oybek nomidagi mukofotga
								sazovor bo'lgan. 1993 yil 'Yoshlik' jurnalida 'Otamdan qolgan
								dalalar' romani chop etilgan. 2001 yil Tog'ay Murodning ikkinchi
								romani 'Bu dunyoda hatto o'lim yo'q' nashrdan chiqadi.
							</p>

							<p className='animate-in fade-in duration-700 delay-[1400ms] hover:text-slate-900 dark:hover:text-slate-100 transition-colors'>
								Tog'ay Murod Jek Londonning hikoyalarini va dramasini,
								Ye.Seton-Tompsonning mashhur 'Yovvoyi yo'rg'a' kitobini o'zbek
								tiliga tarjima qilgan.
							</p>

							<p className='animate-in fade-in duration-700 delay-[1600ms] hover:text-slate-900 dark:hover:text-slate-100 transition-colors'>
								Tog'ay Murodni, avvalam bor, davrning ijtimoiy masalalari,
								insonning axloqiy qiyofasi, mehnatga, insonlarga bo'lgan
								munosabati tashvishga soladi. Burch, majburiyat, mehnatkashlik,
								jasorat, haqqoniylik, samimiylik, mehribonlik - shular yozuvchi
								badiiy so'z orqali ifoda etgan insoniy hislatlardir.
							</p>
						</div>
					</div>
				</div>

				{/* Works Section */}
				<div>
					<div className='relative bg-linear-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-700/50 backdrop-blur-sm'>
						<div className='absolute inset-0 bg-linear-to-r from-indigo-500/5 to-blue-500/5 rounded-2xl'></div>
						<h2 className='relative text-3xl font-bold text-transparent bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text mb-8 flex items-center gap-3'>
							<div className='relative'>
								<div className='w-3 h-3 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse'></div>
								<div className='absolute inset-0 w-3 h-3 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full animate-ping'></div>
							</div>
							Ijod namunalari
						</h2>
						<div className='relative grid gap-4'>
							{[
								{
									title: '"Ot kishnagan oqshom"',
									year: '1979',
									delay: 'delay-[800ms]',
								},
								{
									title: '"Oydinda yurgan odamlar"',
									year: '1980',
									delay: 'delay-[1000ms]',
								},
								{
									title: '"Momo Yer qo\'shig\'i"',
									year: '1985',
									delay: 'delay-[1200ms]',
								},
							].map((work, idx) => (
								<div
									key={idx}
									className={`animate-in slide-in-from-right duration-700 ${work.delay} flex justify-between items-center p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl border border-white/50 dark:border-slate-600/50 hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-500 hover:scale-105 hover:shadow-xl group`}
								>
									<span className='font-semibold text-lg text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300'>
										{work.title}
									</span>
									<span className='text-sm font-medium px-3 py-1 bg-linear-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-700'>
										{work.year}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

function Works() {
	const [selectedBook, setSelectedBook] = useState<number | null>(null)

	const books = [
		{
			id: 1,
			title: 'Yulduzlar mangu yonadi',
			year: 1976,
			description:
				"Tog'ay Murodning debyut qissasi bo'lib, unda yosh avlodning hayotga bo'lgan intilishlari va orzulari tasvirlangan. Asar yozuvchining o'ziga xos uslubi va chuqur psixologik tahlili bilan ajralib turadi.",
			category: 'Qissalar',
			cover: '/books/yulduzlar.png',
			pdf: "/docs/Tog'ay Murod. Yulduzlar mangu yonadi (qissalar).pdf",
		},
		{
			id: 2,
			title: 'Ot kishnagan oqshom',
			year: 2006,
			description:
				"Qishloq hayoti va odamlar o'rtasidagi murakkab munosabatlarni aks ettiruvchi asar. Tabiat va inson ruhiyatining o'zaro bog'liqligi chuqur ochib berilgan.",
			category: 'Qissalar',
			cover: '/books/otkishnagan.png',
			pdf: "/docs/Tog'ay Murod. Ot kishnagan oqshom (qissalar, 2006).pdf",
		},
		{
			id: 3,
			title: 'Oydinda yurgan odamlar',
			year: 1980,
			description:
				"Oybek nomidagi mukofot sovrindori bo'lgan bu asar Tog'ay Murodning eng mashhur asarlaridan biri. Unda insoniy his-tuyg'ular va ichki kechinmalar nozik tasvirlangan.",
			category: 'Qissalar va hikoyalar',
			cover: '/books/oydinda.png',
			pdf: "/docs/Tog'ay_Murod_Oydinda_yurgan_odamlar_qissalar,_hikoyalar.pdf",
		},
		{
			id: 4,
			title: "Qo'shiq",
			year: 1985,
			description:
				"Tog'ay Murodning chuqur falsafiy asari bo'lib, unda ona Yer va insoniyat o'rtasidagi munosabatlar poetik tilda bayon qilingan.",
			category: 'Qissalar',
			cover: '/books/momoyer.png',
			pdf: "/docs/Tog'ay Murod. Qo'shiq (qissalar).pdf",
		},
		{
			id: 5,
			title: "Bu dunyoda o'lib bo'lmaydi",
			year: 1990,
			description:
				"Tarixiy voqealar va zamonaviy hayot o'rtasidagi bog'liqlikni ko'rsatuvchi asar. Milliy an'analar va zamonaviylik masalalari ko'tarilgan.",
			category: 'Roman',
			cover: '/books/bu-dunyoda.png',
			pdf: "/docs/Tog'ay Murod. Bu dunyoda o'lib bo'lmaydi (roman).pdf",
		},
		{
			id: 6,
			title: 'Otamdan qolgan dalalar',
			year: 1992,
			description:
				"Afsonaviy va real hayot elementlarini uyg'unlashtirgan noyob asar. Orzular va haqiqat o'rtasidagi chegara yo'qolgan dunyoni tasvirlaydi.",
			category: 'Roman',
			cover: '/books/otamdan.png',
			pdf: "/docs/Tog'ay Murod. Otamdan qolgan dalalar (roman).pdf",
		},
		{
			id: 7,
			title: 'Tanlangan asarlar (1-jild)',
			year: 1995,
			description:
				"Tog'ay Murodning tanlangan asarlarining birinchi jildi bo'lib, eng mashhur qissalari va hikoyalarini o'z ichiga oladi.",
			category: 'Tanlangan asarlar',
			cover: '/books/tanlangan1.png',
			pdf: "/docs/Tog'ay Murod. Tanlangan asarlar. 1-jild.pdf",
		},
		{
			id: 8,
			title: 'Tanlangan asarlar (2-jild)',
			year: 1999,
			description:
				"Tog'ay Murodning tanlangan asarlarining ikkinchi jildi bo'lib, romanlar va katta asarlarni o'z ichiga oladi.",
			category: 'Romanlar',
			cover: '/books/tanlangan2.png',
			pdf: "/docs/Tog'ay Murod. Tanlangan asarlar. 2-jild. Romanlar.pdf",
		},
	]

	return (
		<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20'>
			{/* Hero Header */}
			<div className='text-center mb-16'>
				<div className='relative inline-block'>
					<h1 className='text-4xl sm:text-6xl font-bold bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6 text-balance'>
						Asarlari
					</h1>
					<div className='absolute -inset-2 bg-linear-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 blur-lg rounded-lg opacity-30 animate-pulse'></div>
				</div>
				<p className='text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8'>
					Tog'ay Murodning adabiy merosi va ijod namunalari. Kitob ustiga
					bosing!
				</p>
			</div>

			{/* Books Grid */}
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16'>
				{books.map((book, idx) => (
					<div
						key={book.id}
						onClick={() =>
							setSelectedBook(selectedBook === book.id ? null : book.id)
						}
						className={`group cursor-pointer animate-in slide-in-from-bottom duration-700 delay-${
							(idx + 1) * 100
						} relative transform transition-all duration-300 hover:scale-105 ${
							selectedBook === book.id ? 'scale-105 z-10' : ''
						}`}
					>
						{/* Card Background Glow */}
						<div className='absolute inset-0 bg-linear-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500'></div>

						{/* Book Card */}
						<div className='relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-emerald-300/50 dark:group-hover:border-emerald-700/50'>
							{/* Year Badge */}
							<div className='absolute top-2 right-2 z-10'>
								<span className='px-2 py-1 bg-linear-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-700'>
									{book.year}
								</span>
							</div>

							{/* Book Cover */}
							<div className='relative mb-4'>
								<div className='aspect-3/4 bg-linear-to-br from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 rounded-xl border-2 border-emerald-200/50 dark:border-emerald-700/50 flex items-center justify-center overflow-hidden'>
									<img
										src={book.cover}
										alt={book.title}
										className='w-full h-full object-cover rounded-lg'
										onError={e => {
											const target = e.target as HTMLImageElement
											target.style.display = 'none'
											target.nextElementSibling?.classList.remove('hidden')
										}}
									/>
									{/* Fallback design when image doesn't load */}
									<div className='w-full h-full hidden flex-col items-center justify-center p-4 text-center'>
										<div className='text-3xl mb-2'>📖</div>
										<h3 className='text-sm font-bold text-emerald-700 dark:text-emerald-300 leading-tight'>
											{book.title}
										</h3>
									</div>
								</div>
								{/* Hover overlay */}
								<div className='absolute inset-0 bg-emerald-600/20 dark:bg-emerald-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
									<div className='text-white font-semibold text-sm px-3 py-1 bg-black/50 rounded-full'>
										Batafsil
									</div>
								</div>
							</div>

							{/* Book Info */}
							<div className='space-y-2'>
								<div className='text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-wider'>
									{book.category}
								</div>
								<h3 className='text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300'>
									{book.title}
								</h3>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Full Screen Modal for Selected Book */}
			{selectedBook && (
				<>
					{/* Modal Overlay - Full Screen */}
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
									{/* Modal Header - Fixed Top */}
									<div className='sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 border-b-2 border-emerald-200 dark:border-emerald-700 z-20 shadow-lg'>
										<div className='max-w-7xl mx-auto flex items-center justify-between'>
											{/* Title */}
											<div className='flex items-center gap-4'>
												<h1 className='text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100'>
													{book.title}
												</h1>
												<span className='px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold rounded-full'>
													{book.year} yil
												</span>
											</div>
											{/* Close Button */}
											<button
												onClick={() => setSelectedBook(null)}
												className='w-12 h-12 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/70 transition-all duration-200 text-2xl font-bold shadow-lg hover:shadow-xl'
											>
												×
											</button>
										</div>
									</div>

									{/* Modal Content - Full Screen */}
									<div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900/20 py-8'>
										<div className='max-w-7xl mx-auto px-6 lg:px-8'>
											{/* Book Detail Layout - Full Screen Side by Side */}
											<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
												{/* Book Cover - Left Side - Full Screen */}
												<div className='flex justify-center lg:justify-start'>
													<div className='relative w-80 h-[500px] lg:w-96 lg:h-[600px]'>
														<div className='absolute inset-0 bg-linear-to-br from-emerald-200 via-teal-100 to-cyan-200 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-800 rounded-3xl shadow-2xl'></div>
														<div className='relative w-full h-full bg-white dark:bg-slate-800 rounded-3xl p-6 border-4 border-emerald-200 dark:border-emerald-700 flex items-center justify-center overflow-hidden shadow-2xl'>
															<img
																src={book.cover}
																alt={book.title}
																className='w-full h-full object-cover rounded-2xl shadow-xl'
																onError={e => {
																	const target = e.target as HTMLImageElement
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
															{/* Fallback design */}
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

												{/* Book Information - Right Side - Full Screen */}
												<div className='space-y-8'>
													{/* Category Badges - Full Screen */}
													<div className='flex flex-wrap items-center gap-4'>
														<span className='px-6 py-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-lg font-bold rounded-full border-4 border-emerald-200 dark:border-emerald-700 shadow-lg'>
															{book.category}
														</span>
														<span className='px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-lg font-semibold rounded-full shadow-md'>
															{book.year} yil
														</span>
													</div>

													{/* Description - Full Screen */}
													<div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 shadow-xl'>
														<h4 className='text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3'>
															<span className='text-3xl'>📖</span>
															Asar haqida
														</h4>
														<p className='text-slate-700 dark:text-slate-300 leading-relaxed text-justify text-lg lg:text-xl'>
															{book.description}
														</p>
													</div>

													{/* Download Section - Full Screen */}
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

			{/* Additional Info Section */}
			<div className='mt-16 animate-in slide-in-from-bottom duration-1000 delay-700'>
				<div className='relative bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-700/50 backdrop-blur-sm'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold text-transparent bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text mb-4'>
							Adabiy Meros
						</h3>
						<p className='text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed'>
							Tog'ay Murodning har bir asari o'zbek adabiyotining boy merosiga
							qo'shilgan bebaho hissa bo'lib, unda insoniy qadriyatlar, ma'naviy
							go'zallik va hayot haqiqatlari chuqur aks etgan. Barcha asarlar
							PDF formatida bepul yuklab olinishi mumkin.
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}

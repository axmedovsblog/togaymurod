'use client'

import { useEffect, useState } from 'react'

interface HeroProps {
	onNavigate: (page: 'home' | 'biography' | 'works' | 'corpus') => void
}

export default function Hero({ onNavigate }: HeroProps) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
			{/* Animated Background */}
			<div className='absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950'>
				{/* Floating shapes */}
				<div className='absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-800/30 rounded-full blur-xl animate-pulse'></div>
				<div className='absolute top-40 right-20 w-24 h-24 bg-teal-200/40 dark:bg-teal-800/40 rounded-full blur-lg animate-bounce delay-1000'></div>
				<div className='absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-200/20 dark:bg-cyan-800/20 rounded-full blur-2xl animate-pulse delay-2000'></div>
				<div className='absolute bottom-20 right-1/3 w-28 h-28 bg-emerald-300/25 dark:bg-emerald-700/25 rounded-full blur-lg animate-bounce delay-500'></div>
			</div>

			<div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
				{/* Main Title with Animation */}
				<div
					className={`space-y-8 mt-19 transition-all duration-1000 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
					}`}
				>
					{/* Author Name */}
					<div className='relative'>
						<h1 className='text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4  animate-in fade-in slide-in-from-bottom duration-1000'>
							Tog'ay Murod
						</h1>
						<div className='absolute -inset-4 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 blur-2xl rounded-full opacity-30 animate-pulse'></div>
					</div>

					{/* Subtitle with typing effect */}
					<div
						className={`space-y-2 transition-all duration-1000 delay-500 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-5'
						}`}
					>
						<p className='text-2xl sm:text-3xl lg:text-4xl text-slate-700 dark:text-slate-300 font-light'>
							O'zbek adabiyotining nufuzli vakili
						</p>
						<p className='text-lg sm:text-xl text-slate-600 dark:text-slate-400'>
							(1948-2003)
						</p>
					</div>

					{/* Quote Section */}
					<div
						className={`mt-16 transition-all duration-1000 delay-1200 ${
							isVisible
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-5'
						}`}
					>
						<div className='relative max-w-3xl mx-auto'>
							<div className='absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 blur-xl rounded-2xl'></div>
							<blockquote className='relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl p-8 rounded-2xl border border-emerald-200 dark:border-emerald-700 shadow-xl'>
								<div className='text-6xl text-emerald-400 dark:text-emerald-500 mb-4'>
									"
								</div>
								<p className='text-lg sm:text-xl text-slate-700 dark:text-slate-300 italic leading-relaxed mb-4'>
									Adabiyot - bu insonning ruhiy dunyosini ochib beruvchi ko'zgu.
									Har bir so'z, har bir jumla hayotning go'zalligini aks
									ettirishi kerak.
								</p>
								<footer className='text-right'>
									<cite className='text-emerald-600 dark:text-emerald-400 font-semibold'>
										— Tog'ay Murod
									</cite>
								</footer>
							</blockquote>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div
				className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1500 ${
					isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
				}`}
			>
				<div className='flex flex-col items-center space-y-2'>
					<p className='text-sm text-slate-500 dark:text-slate-400'>
						Pastga aylantiring
					</p>
					<div className='w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center'>
						<div className='w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 animate-bounce'></div>
					</div>
				</div>
			</div>
		</section>
	)
}

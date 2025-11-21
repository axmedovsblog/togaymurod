'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavigationProps {
	currentPage: 'home' | 'biography' | 'works' | 'corpus'
	onPageChange: (page: 'home' | 'biography' | 'works' | 'corpus') => void
	isDarkMode: boolean
	toggleDarkMode: () => void
}

export default function Navigation({
	currentPage,
	onPageChange,
	isDarkMode,
	toggleDarkMode,
}: NavigationProps) {
	const [isOpen, setIsOpen] = useState(false)

	const navItems = [
		{ id: 'home', label: 'Bosh sahifa' },
		{ id: 'biography', label: 'Tarjimayi hol' },
		{ id: 'works', label: 'Asarlari' },
		{ id: 'corpus', label: 'Korpus' },
	]

	const handleNavClick = (page: any) => {
		onPageChange(page)
		setIsOpen(false)
	}

	return (
		<nav className='sticky top-0 z-50 bg-card border-b border-border'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<button
						onClick={() => handleNavClick('home')}
						className='text-xl font-bold text-primary hover:opacity-80 transition-opacity'
					>
						Tog'ay Murod
					</button>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-8'>
						{navItems.map(item => (
							<button
								key={item.id}
								onClick={() => handleNavClick(item.id)}
								className={`text-sm font-medium transition-colors ${
									currentPage === item.id
										? 'text-primary border-b-2 border-primary pb-2'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								{item.label}
							</button>
						))}

						{/* Dark Mode Toggle */}
						<button
							onClick={toggleDarkMode}
							className='w-10 h-10 bg-muted hover:bg-muted/80 rounded-full transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border'
							title={isDarkMode ? 'Kunduzgi rejim' : 'Tungi rejim'}
						>
							<div className='relative w-5 h-5'>
								{/* Sun Icon */}
								<svg
									className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-500 ${
										isDarkMode
											? 'opacity-0 rotate-90 scale-75'
											: 'opacity-100 rotate-0 scale-100'
									}`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<circle cx='12' cy='12' r='5'></circle>
									<line x1='12' y1='1' x2='12' y2='3'></line>
									<line x1='12' y1='21' x2='12' y2='23'></line>
									<line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
									<line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
									<line x1='1' y1='12' x2='3' y2='12'></line>
									<line x1='21' y1='12' x2='23' y2='12'></line>
									<line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
									<line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
								</svg>

								{/* Moon Icon */}
								<svg
									className={`absolute inset-0 w-5 h-5 text-indigo-400 transition-all duration-500 ${
										isDarkMode
											? 'opacity-100 rotate-0 scale-100'
											: 'opacity-0 rotate-90 scale-75'
									}`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
								</svg>
							</div>
						</button>
					</div>

					{/* Mobile Navigation Right Side */}
					<div className='md:hidden flex items-center gap-2'>
						{/* Dark Mode Toggle - Mobile */}
						<button
							onClick={toggleDarkMode}
							className='w-10 h-10 bg-muted hover:bg-muted/80 rounded-full transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-border'
							title={isDarkMode ? 'Kunduzgi rejim' : 'Tungi rejim'}
						>
							<div className='relative w-5 h-5'>
								{/* Sun Icon */}
								<svg
									className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-500 ${
										isDarkMode
											? 'opacity-0 rotate-90 scale-75'
											: 'opacity-100 rotate-0 scale-100'
									}`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<circle cx='12' cy='12' r='5'></circle>
									<line x1='12' y1='1' x2='12' y2='3'></line>
									<line x1='12' y1='21' x2='12' y2='23'></line>
									<line x1='4.22' y1='4.22' x2='5.64' y2='5.64'></line>
									<line x1='18.36' y1='18.36' x2='19.78' y2='19.78'></line>
									<line x1='1' y1='12' x2='3' y2='12'></line>
									<line x1='21' y1='12' x2='23' y2='12'></line>
									<line x1='4.22' y1='19.78' x2='5.64' y2='18.36'></line>
									<line x1='18.36' y1='5.64' x2='19.78' y2='4.22'></line>
								</svg>

								{/* Moon Icon */}
								<svg
									className={`absolute inset-0 w-5 h-5 text-indigo-400 transition-all duration-500 ${
										isDarkMode
											? 'opacity-100 rotate-0 scale-100'
											: 'opacity-0 rotate-90 scale-75'
									}`}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
								</svg>
							</div>
						</button>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='text-foreground'
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isOpen && (
					<div className='md:hidden pb-4 space-y-2'>
						{navItems.map(item => (
							<button
								key={item.id}
								onClick={() => handleNavClick(item.id)}
								className={`block w-full text-left px-4 py-2 rounded text-sm font-medium transition-colors ${
									currentPage === item.id
										? 'bg-primary text-primary-foreground'
										: 'text-foreground hover:bg-muted'
								}`}
							>
								{item.label}
							</button>
						))}
					</div>
				)}
			</div>
		</nav>
	)
}

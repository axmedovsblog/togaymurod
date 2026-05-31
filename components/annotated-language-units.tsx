'use client'

import { annotatedData, TilBirligi } from '@/lib/annotated-data'
import * as Popover from '@radix-ui/react-popover'
import { BookOpen, Lightbulb, Search, Tag, X } from 'lucide-react'
import { useMemo, useState } from 'react'

interface UnitWithAsar extends TilBirligi {
  asar: string
}

function AnnotationContent({ unit }: { unit: UnitWithAsar }) {
  const getTypeColor = (turi: string) => {
    const l = turi.toLowerCase()
    if (l.includes('maqol')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
    if (l.includes('ibora')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
    if (l.includes('frazeologizm')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300'
    if (l.includes('metafora')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
    if (l.includes('o`xshatish')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900/60 dark:text-pink-300'
    if (l.includes('qarg`ish')) return 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300'
    return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
  }

  return (
    <div className='w-80'>
      <div className='text-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-700'>
        <p className='text-sm font-bold text-slate-800 dark:text-slate-100'>{unit.til_birligi}</p>
        <span className={`inline-block mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded-full ${getTypeColor(unit.turi)}`}>{unit.turi}</span>
      </div>
      <div className='space-y-2.5'>
        <div className='bg-violet-50 dark:bg-violet-900/20 rounded-lg p-2.5 border border-violet-100 dark:border-violet-800'>
          <span className='text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider flex items-center gap-1.5 mb-1'>
            <BookOpen className='w-3 h-3' />Asar
          </span>
          <p className='text-xs text-slate-700 dark:text-slate-300 font-medium'>{unit.asar}</p>
        </div>
        <div className='bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-2.5 border border-emerald-100 dark:border-emerald-800'>
          <span className='text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1'>
            <Lightbulb className='w-3 h-3' />Semantik ma&apos;no
          </span>
          <p className='text-xs text-slate-700 dark:text-slate-300 leading-snug'>{unit.semantik_maʼno}</p>
        </div>
        <div className='bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2.5 border border-amber-100 dark:border-amber-800'>
          <span className='text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-1'>
            <Tag className='w-3 h-3' />Badiiy funksiyasi
          </span>
          <p className='text-xs text-slate-700 dark:text-slate-300 leading-snug'>{unit.badiiy_funksiyasi}</p>
        </div>
      </div>
    </div>
  )
}

export default function AnnotatedLanguageUnits() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('hammasi')
  const [selectedAsar, setSelectedAsar] = useState('hammasi')

  const allUnits = useMemo(() => {
    const units: UnitWithAsar[] = []
    Object.entries(annotatedData).forEach(([asar, items]) => {
      items.forEach(item => units.push({ ...item, asar }))
    })
    return units
  }, [])

  const types = useMemo(() => {
    const s = new Set(allUnits.map(u => u.turi))
    return Array.from(s).sort()
  }, [allUnits])

  const asarNames = useMemo(() => Object.keys(annotatedData).sort(), [])

  const filtered = useMemo(() => {
    return allUnits.filter(u => {
      const mSearch = u.til_birligi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.semantik_maʼno.toLowerCase().includes(searchTerm.toLowerCase())
      const mType = selectedType === 'hammasi' || u.turi.toLowerCase() === selectedType.toLowerCase()
      const mAsar = selectedAsar === 'hammasi' || u.asar === selectedAsar
      return mSearch && mType && mAsar
    })
  }, [allUnits, searchTerm, selectedType, selectedAsar])

  const getTypeColor = (turi: string) => {
    const l = turi.toLowerCase()
    if (l.includes('maqol')) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-700'
    if (l.includes('ibora')) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700'
    if (l.includes('frazeologizm')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border-purple-200 dark:border-purple-700'
    if (l.includes('metafora')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-700'
    if (l.includes('o`xshatish')) return 'bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300 border-pink-200 dark:border-pink-700'
    if (l.includes('qarg`ish')) return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-700'
    return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-600'
  }

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
      <div className='text-center mb-12'>
        <div className='relative inline-block'>
          <h1 className='text-3xl sm:text-5xl font-bold bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 text-balance'>
            Anotatsiyalangan til birliklari bazasi
          </h1>
          <div className='absolute -inset-2 bg-linear-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 blur-lg rounded-lg opacity-30 animate-pulse'></div>
        </div>
        <p className='text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>
          Tog&apos;ay Murod asarlaridan olingan til birliklari va ularning anotatsiyalari
        </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 border border-violet-100 dark:border-violet-800 text-center shadow-lg'>
          <div className='text-2xl font-bold text-violet-600 dark:text-violet-400'>{allUnits.length}</div>
          <div className='text-sm text-slate-600 dark:text-slate-400'>Jami birliklar</div>
        </div>
        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 border border-violet-100 dark:border-violet-800 text-center shadow-lg'>
          <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>{types.length}</div>
          <div className='text-sm text-slate-600 dark:text-slate-400'>Turlar</div>
        </div>
        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 border border-violet-100 dark:border-violet-800 text-center shadow-lg'>
          <div className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>{asarNames.length}</div>
          <div className='text-sm text-slate-600 dark:text-slate-400'>Asarlar</div>
        </div>
        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 border border-violet-100 dark:border-violet-800 text-center shadow-lg'>
          <div className='text-2xl font-bold text-fuchsia-600 dark:text-fuchsia-400'>{filtered.length}</div>
          <div className='text-sm text-slate-600 dark:text-slate-400'>Filtrlangan</div>
        </div>
      </div>

      <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-violet-100 dark:border-violet-800 shadow-xl mb-8'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
            <input type='text' placeholder='Til birligini qidirish...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all' />
          </div>
          <select value={selectedAsar} onChange={e => setSelectedAsar(e.target.value)}
            className='px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer'>
            <option value='hammasi'>Barcha asarlar</option>
            {asarNames.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={selectedType} onChange={e => setSelectedType(e.target.value)}
            className='px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer'>
            <option value='hammasi'>Barcha turlar</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-violet-100 dark:border-violet-800 shadow-xl overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-violet-50 dark:bg-violet-900/30 border-b border-violet-200 dark:border-violet-700'>
                <th className='px-6 py-4 text-left text-sm font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wider w-16'>#</th>
                <th className='px-6 py-4 text-left text-sm font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wider'>Til birligi</th>
                <th className='px-6 py-4 text-left text-sm font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wider'>Turi</th>
                <th className='px-6 py-4 text-left text-sm font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wider hidden md:table-cell'>Asar</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200 dark:divide-slate-700'>
              {filtered.map((u, i) => {
                const key = `${u.asar}-${u.id}`
                return (
                  <Popover.Root key={key}>
                    <Popover.Trigger asChild>
                      <tr className='relative transition-all duration-200 group cursor-pointer'>
                        <td className='px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium'>{i + 1}</td>
                        <td className='px-6 py-4'>
                          <span className='text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors'>{u.til_birligi}</span>
                        </td>
                        <td className='px-6 py-4'>
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getTypeColor(u.turi)}`}>{u.turi}</span>
                        </td>
                        <td className='px-6 py-4 hidden md:table-cell'>
                          <span className='text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2'>
                            <BookOpen className='w-4 h-4 text-violet-500' />{u.asar}
                          </span>
                        </td>
                      </tr>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        className='z-50 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-violet-200 dark:border-violet-700 p-4 data-[side=bottom]:animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=top]:animate-in data-[side=top]:slide-in-from-bottom-2'
                        side='bottom'
                        align='start'
                        sideOffset={6}
                        collisionPadding={16}
                        avoidCollisions={true}
                      >
                        <div className='relative'>
                          <Popover.Close className='absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-200 transition-all cursor-pointer'>
                            <X className='w-3 h-3' />
                          </Popover.Close>
                          <AnnotationContent unit={u} />
                        </div>
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className='px-6 py-12 text-center text-slate-500 dark:text-slate-400'>
                  <Search className='w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3' />
                  <p className='text-lg'>Natija topilmadi</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </main>
  )
}

'use client'

import { usePathname, useRouter } from 'next/navigation'
import { languages } from '@/app/i18n/settings'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher({ lng }: { lng: string }) {
    const pathname = usePathname()
    const router = useRouter()

    const handleLanguageChange = (newLng: string) => {
        if (!pathname) return
        const segments = pathname.split('/')
        segments[1] = newLng
        const newPath = segments.join('/')
        router.push(newPath)
    }

    return (
        <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 border border-white/10 backdrop-blur-sm">
            <Globe className="w-4 h-4 text-gray-400 ml-2" />
            <div className="flex">
                {languages.map((l) => (
                    <button
                        key={l}
                        onClick={() => handleLanguageChange(l)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${lng === l
                                ? 'bg-orange-500 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {l.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    )
}

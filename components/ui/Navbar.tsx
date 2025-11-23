'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, Menu, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@/app/i18n/client';
import LanguageSwitcher from '../LanguageSwitcher';

export default function Navbar({ lng }: { lng: string }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation(lng, 'translation');

    const navItems = [
        { name: t('nav.home'), href: `/${lng}` },
        { name: t('nav.compare'), href: `/${lng}/compare` },
        { name: t('nav.quiz'), href: `/${lng}/quiz` },
        { name: t('nav.about'), href: `/${lng}/about` },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-3 flex items-center justify-between shadow-xl">
                    {/* Logo */}
                    <Link href={`/${lng}`} className="flex items-center gap-2 text-white font-bold text-xl tracking-wider group">
                        <div className="p-2 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg group-hover:scale-110 transition-transform">
                            <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <span>SOLAR<span className="text-orange-400">IS</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={clsx(
                                    "relative text-sm font-medium transition-colors hover:text-orange-400",
                                    pathname === item.href ? "text-orange-400" : "text-gray-300"
                                )}
                            >
                                {item.name}
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-400 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                        <LanguageSwitcher lng={lng} />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden absolute top-24 left-6 right-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "text-lg font-medium p-2 rounded-lg transition-colors",
                                    pathname === item.href ? "bg-white/10 text-orange-400" : "text-gray-300 hover:bg-white/5"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="p-2">
                            <LanguageSwitcher lng={lng} />
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    );
}

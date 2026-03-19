'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, Menu, X, Globe, Compass, Info, Microscope, BarChart2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@/app/i18n/client';
import LanguageSwitcher from '../LanguageSwitcher';

export default function Navbar({ lng }: { lng: string }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation(lng, 'translation');

    const navItems = [
        { name: t('nav.home'), href: `/${lng}`, icon: Globe },
        { name: t('nav.explore'), href: `/${lng}/explore`, icon: Compass },
        { name: t('nav.discovery'), href: `/${lng}/discovery`, icon: Microscope },
        { name: t('nav.compare'), href: `/${lng}/compare`, icon: BarChart2 },
        { name: t('nav.quiz'), href: `/${lng}/quiz`, icon: BookOpen },
        { name: t('nav.about'), href: `/${lng}/about`, icon: Info },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-[60] px-6 py-4">
            <div className="max-w-7xl mx-auto">
                <div className="glass rounded-2xl px-6 py-2.5 flex items-center justify-between shadow-2xl border-white/5">
                    {/* Logo */}
                    <Link href={`/${lng}`} className="flex items-center gap-2.5 text-white font-bold text-xl tracking-[0.1em] group">
                        <div className="p-2.5 bg-linear-to-br from-solar-orange to-red-600 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_20px_rgba(251,146,60,0.4)]">
                            <Rocket className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-orbitron tracking-widest text-lg">SOLAR<span className="text-solar-orange">IS</span></span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(
                                        "relative px-3 py-1.5 flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 group",
                                        isActive ? "text-solar-orange" : "text-white/60 hover:text-white"
                                    )}
                                >
                                    <Icon className={clsx("w-4 h-4 transition-transform group-hover:scale-110", isActive && "text-glow")} />
                                    <span>{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-solar-orange rounded-full shadow-[0_0_10px_rgba(251,146,60,0.8)]"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                        <div className="w-px h-6 bg-white/10 mx-2" />
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

import { Star, Sparkles, Compass } from 'lucide-react';

const facts = [
    {
        title: "Cosmic Scale",
        text: "The Sun is so large that approximately 1.3 million Earths could fit inside it.",
        icon: <Sun className="w-4 h-4 text-orange-400" />
    },
    {
        title: "Starlight",
        text: "The light from the nearest star (after the Sun), Proxima Centauri, takes 4.2 years to reach us.",
        icon: <Star className="w-4 h-4 text-blue-400" />
    },
    {
        title: "Gravity",
        text: "On the Moon, you could jump six times higher than you can on Earth.",
        icon: <Sparkles className="w-4 h-4 text-purple-400" />
    },
    {
        title: "Celestial History",
        text: "The Babylonians were the first to divide the sky into 12 signs of the zodiac around 1,000 BCE, matching them to the constellations where the Sun appeared to pass throughout the year.",
        icon: <Compass className="w-4 h-4 text-green-400" />
    },
    {
        title: "Changing Skies",
        text: "Due to Earth's axial precession, the position of the constellations has shifted by about 30 degrees (a full zodiac sign) since the systems were established 3,000 years ago.",
        icon: <Sparkles className="w-4 h-4 text-pink-400" />
    },
    {
        title: "13th Constellation",
        text: "The Sun actually passes through 13 constellations, not 12. Ophiuchus (the Serpent Bearer) is the 'missing' member of the zodiac line.",
        icon: <Sparkles className="w-4 h-4 text-yellow-400" />
    }
];

import { Sun } from 'lucide-react';

export default function AstronomyFacts() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-orange-500" />
                <h3 className="text-2xl font-bold text-white">Did You Know?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facts.map((fact, i) => (
                    <div
                        key={i}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
                                {fact.icon}
                            </div>
                            <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">{fact.title}</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            {fact.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

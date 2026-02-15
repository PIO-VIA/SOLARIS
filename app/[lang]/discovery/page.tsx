import APOD from '@/components/nasa/APOD';
import MarsRoverGallery from '@/components/nasa/MarsRoverGallery';
import NEOTracker from '@/components/nasa/NEOTracker';
import SpaceWeather from '@/components/nasa/SpaceWeather';
import AstronomyFacts from '@/components/nasa/AstronomyFacts';
import { Rocket } from 'lucide-react';

export default function DiscoveryPage() {
    return (
        <div className="min-height-screen bg-black pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold mb-3">
                            <Rocket className="w-3 h-3" />
                            <span>LIVE FROM THE COSMOS</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white">Space Discovery</h1>
                        <p className="text-gray-400 mt-2 max-w-2xl">
                            Explore the latest updates from NASA's missions across the solar system, real-time astronomical events, and cosmic wonders.
                        </p>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* APOD - Full Width */}
                    <div className="lg:col-span-12">
                        <APOD />
                    </div>

                    {/* Mars Rover - 8 cols */}
                    <div className="lg:col-span-8">
                        <MarsRoverGallery />
                    </div>

                    {/* NEO Tracker - 4 cols */}
                    <div className="lg:col-span-4 h-full">
                        <NEOTracker />
                    </div>

                    {/* Space Weather - 4 cols */}
                    <div className="lg:col-span-4">
                        <SpaceWeather />
                    </div>

                    {/* Facts - 8 cols */}
                    <div className="lg:col-span-8">
                        <AstronomyFacts />
                    </div>
                </div>
            </div>
        </div>
    );
}

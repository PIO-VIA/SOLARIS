import { create } from 'zustand';

interface AppState {
    isLoaded: boolean;
    setIsLoaded: (loaded: boolean) => void;
    hoveredPlanet: string | null;
    setHoveredPlanet: (planetId: string | null) => void;
    orbitSpeed: number;
    setOrbitSpeed: (speed: number) => void;
}

export const useStore = create<AppState>((set) => ({
    isLoaded: false,
    setIsLoaded: (loaded) => set({ isLoaded: loaded }),
    hoveredPlanet: null,
    setHoveredPlanet: (planetId) => set({ hoveredPlanet: planetId }),
    orbitSpeed: 1,
    setOrbitSpeed: (speed) => set({ orbitSpeed: speed }),
}));

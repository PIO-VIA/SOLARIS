const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';

// Log status on load (masked)
if (typeof window === 'undefined') {
    console.log(`[NASA API] Using key: ${NASA_API_KEY === 'DEMO_KEY' ? 'DEMO_KEY' : NASA_API_KEY.substring(0, 4) + '...'}`);
}

async function fetchWithTimeout(url: string, options: any = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error: any) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out after ' + timeout + 'ms');
        }
        throw error;
    }
}

export interface APODData {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

export interface MarsPhoto {
    id: number;
    sol: number;
    camera: {
        id: number;
        name: string;
        rover_id: number;
        full_name: string;
    };
    img_src: string;
    earth_date: string;
    rover: {
        id: number;
        name: string;
        landing_date: string;
        launch_date: string;
        status: string;
    };
}

export interface NEO {
    id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: Array<{
        close_approach_date: string;
        relative_velocity: {
            kilometers_per_hour: string;
        };
        miss_distance: {
            kilometers: string;
        };
    }>;
}

export async function getAPOD(): Promise<APODData | null> {
    try {
        const res = await fetchWithTimeout(`${BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error(`NASA API Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error('Error fetching APOD:', error);
        return null;
    }
}

export async function getMarsPhotos(rover: string = 'curiosity'): Promise<MarsPhoto[]> {
    try {
        const res = await fetchWithTimeout(`${BASE_URL}/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${NASA_API_KEY}`, {
            next: { revalidate: 86400 }
        });
        if (!res.ok) throw new Error(`NASA API Error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        return data.latest_photos || [];
    } catch (error) {
        console.error('Error fetching Mars photos:', error);
        return [];
    }
}

export async function getNEOs(): Promise<NEO[]> {
    const today = new Date().toISOString().split('T')[0];
    try {
        const res = await fetchWithTimeout(`${BASE_URL}/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error(`NASA API Error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        const neos = data.near_earth_objects[today] || [];
        return neos;
    } catch (error) {
        console.error('Error fetching NEOs:', error);
        return [];
    }
}

export async function getSpaceWeather(): Promise<any[]> {
    try {
        const res = await fetchWithTimeout(`${BASE_URL}/DONKI/CME?api_key=${NASA_API_KEY}`, {
            next: { revalidate: 3600 }
        });
        if (!res.ok) throw new Error(`NASA API Error: ${res.status} ${res.statusText}`);
        return res.json();
    } catch (error) {
        console.error('Error fetching space weather:', error);
        return [];
    }
}

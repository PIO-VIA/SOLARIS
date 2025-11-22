import { LucideIcon, Thermometer, Ruler, Weight, ArrowLeftRight } from 'lucide-react';

export interface PlanetData {
    id: string;
    name: string;
    color: string;
    size: number; // Relative size
    distance: number; // Relative distance from sun
    speed: number; // Orbit speed
    description: string;
    texture?: string;
    stats: {
        temp: string;
        radius: string;
        mass: string;
        distanceFromSun: string;
    };
}

export const planets: PlanetData[] = [
    {
        id: 'mercury',
        name: 'Mercury',
        color: '#A5A5A5',
        size: 0.8,
        distance: 10,
        speed: 0.04,
        texture: '/mercury.jpg',
        description: "The smallest planet in our solar system and closest to the Sun—is only slightly larger than Earth's Moon. Mercury is the fastest planet, zipping around the Sun every 88 Earth days.",
        stats: {
            temp: '167°C',
            radius: '2,439.7 km',
            mass: '3.285 × 10^23 kg',
            distanceFromSun: '58 million km',
        },
    },
    {
        id: 'venus',
        name: 'Venus',
        color: '#E3BB76',
        size: 1.5,
        distance: 15,
        speed: 0.015,
        texture: '/venus_atmosphere.jpg',
        description: "Spinning in the opposite direction to most planets, Venus is the hottest planet, and one of the brightest objects in the sky. It has a thick atmosphere that traps heat in a runaway greenhouse effect.",
        stats: {
            temp: '464°C',
            radius: '6,051.8 km',
            mass: '4.867 × 10^24 kg',
            distanceFromSun: '108 million km',
        },
    },
    {
        id: 'earth',
        name: 'Earth',
        color: '#22A6B3',
        size: 1.6,
        distance: 20,
        speed: 0.01,
        texture: '/earth.jpg',
        description: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things. It's also the only planet in our solar system with liquid water on the surface.",
        stats: {
            temp: '15°C',
            radius: '6,371 km',
            mass: '5.972 × 10^24 kg',
            distanceFromSun: '149.6 million km',
        },
    },
    {
        id: 'mars',
        name: 'Mars',
        color: '#E0564C',
        size: 1.1,
        distance: 25,
        speed: 0.008,
        texture: '/mars.jpg',
        description: "Mars is a dusty, cold, desert world with a very thin atmosphere. There is strong evidence that Mars was – billions of years ago – wetter and warmer, with a thick atmosphere.",
        stats: {
            temp: '-65°C',
            radius: '3,389.5 km',
            mass: '6.39 × 10^23 kg',
            distanceFromSun: '227.9 million km',
        },
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        color: '#D9A066',
        size: 3.5,
        distance: 35,
        speed: 0.004,
        texture: '/jupiter.jpg',
        description: "Jupiter is more than twice as massive as the other planets of our solar system combined. The giant planet's Great Red Spot is a centuries-old storm bigger than Earth.",
        stats: {
            temp: '-110°C',
            radius: '69,911 km',
            mass: '1.898 × 10^27 kg',
            distanceFromSun: '778.5 million km',
        },
    },
    {
        id: 'saturn',
        name: 'Saturn',
        color: '#EAD6B8',
        size: 3,
        distance: 45,
        speed: 0.003,
        texture: '/saturn.jpg',
        description: "Adorned with a dazzling, complex system of icy rings, Saturn is unique in our solar system. The other giant planets have rings, but none are as spectacular as Saturn's.",
        stats: {
            temp: '-140°C',
            radius: '58,232 km',
            mass: '5.683 × 10^26 kg',
            distanceFromSun: '1.4 billion km',
        },
    },
    {
        id: 'uranus',
        name: 'Uranus',
        color: '#D1F7FF',
        size: 2.2,
        distance: 55,
        speed: 0.002,
        texture: '/uranus.jpg',
        description: "Uranus rotates at a nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear to spin on its side.",
        stats: {
            temp: '-195°C',
            radius: '25,362 km',
            mass: '8.681 × 10^25 kg',
            distanceFromSun: '2.9 billion km',
        },
    },
    {
        id: 'neptune',
        name: 'Neptune',
        color: '#5B5DDF',
        size: 2.1,
        distance: 65,
        speed: 0.001,
        texture: '/neptune.jpg',
        description: "Neptune is dark, cold and whipped by supersonic winds. It was the first planet located through mathematical calculations, rather than by telescope.",
        stats: {
            temp: '-200°C',
            radius: '24,622 km',
            mass: '1.024 × 10^26 kg',
            distanceFromSun: '4.5 billion km',
        },
    },
];

export const quizQuestions = [
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Mars", "Earth"],
        answer: 1, // Index of correct answer
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Saturn", "Mars", "Venus"],
        answer: 2,
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
        answer: 1,
    },
    {
        question: "Which planet has the most spectacular ring system?",
        options: ["Jupiter", "Uranus", "Saturn", "Neptune"],
        answer: 2,
    },
    {
        question: "Which planet rotates on its side?",
        options: ["Neptune", "Mars", "Earth", "Uranus"],
        answer: 3,
    },
];

// ==================== GIPHY MODULE ====================
// Dynamic weather background using Giphy
// Jorge Luis Risso Patron - 2026

import { API_CONFIG } from './config.js';

const giphyCache = new Map();
const recentGifs = new Set();
const MAX_RECENT = 20;

function getWeatherHashtag(weatherData) {
    const condition = weatherData.weather[0].main.toLowerCase();
    const description = weatherData.weather[0].description.toLowerCase();
    const temp = weatherData.main.temp;
    const icon = weatherData.weather[0].icon;
    const isNight = icon.includes('n');

    const hashtagMap = {
        rain: temp > 20 ? 'rainstorm raining' : 'rainfall raindrops',
        drizzle: 'drizzle rain',
        thunderstorm: isNight ? 'lightning thunderstorm' : 'thunder lightning',
        snow: 'snowfall snowing',
        clouds: (() => {
            if (description.includes('overcast')) return 'overcast cloudy';
            if (description.includes('scattered')) return 'partly cloudy';
            return isNight ? 'clouds night' : 'cloudy sky';
        })(),
        clear: (() => {
            if (isNight) return 'stars night';
            if (temp > 30) return 'sun sunny hot';
            if (temp > 20) return 'sunny sunshine';
            return 'clear sky';
        })(),
        mist: 'misty foggy',
        smoke: 'smoke',
        haze: 'haze',
        dust: 'dust storm',
        fog: 'fog foggy',
        sand: 'sandstorm',
        ash: 'ash',
        squall: 'wind storm',
        tornado: 'tornado twister'
    };

    let hashtag = hashtagMap[condition];
    if (!hashtag) {
        if (temp > 30) hashtag = 'hot summer sun';
        else if (temp > 20) hashtag = 'warm spring nature';
        else if (temp > 10) hashtag = 'cool autumn nature';
        else hashtag = 'cold winter nature';
    }

    return hashtag;
}

function buildGiphyUrl(hashtag) {
    if (API_CONFIG.PROXY.ENABLED) {
        const params = new URLSearchParams({
            q: hashtag,
            limit: '50',
            rating: 'g',
            lang: 'es'
        });
        return `${API_CONFIG.PROXY.GIPHY_ENDPOINT}?${params.toString()}`;
    }

    if (API_CONFIG.GIPHY_API_KEY === 'TU_GIPHY_API_KEY_AQUI') {
        return null;
    }

    return `${API_CONFIG.GIPHY_BASE_URL}/search?api_key=${API_CONFIG.GIPHY_API_KEY}&q=${encodeURIComponent(hashtag)}&limit=50&rating=g&lang=es`;
}

export async function getWeatherGif(weatherData) {
    const hashtag = getWeatherHashtag(weatherData);
    const cacheKey = `giphy_${hashtag}`;

    if (giphyCache.has(cacheKey)) {
        const cached = giphyCache.get(cacheKey);
        if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
            return selectRandomGif(cached.gifs);
        }
    }

    const url = buildGiphyUrl(hashtag);
    if (!url) return null;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Giphy API error: ${response.status}`);
        }

        const data = await response.json();
        if (!data.data || data.data.length === 0) {
            return null;
        }

        giphyCache.set(cacheKey, {
            gifs: data.data,
            timestamp: Date.now()
        });

        return selectRandomGif(data.data);
    } catch (error) {
        console.error('Error obteniendo GIF:', error);
        return null;
    }
}

function selectRandomGif(gifs) {
    let availableGifs = gifs.filter((gif) => !recentGifs.has(gif.id));

    if (availableGifs.length === 0) {
        recentGifs.clear();
        availableGifs = gifs;
    }

    const randomGif = availableGifs[Math.floor(Math.random() * availableGifs.length)];
    recentGifs.add(randomGif.id);

    if (recentGifs.size > MAX_RECENT) {
        const firstItem = recentGifs.values().next().value;
        recentGifs.delete(firstItem);
    }

    return randomGif.images.original.url;
}

export function applyGifBackground(gifUrl, container) {
    if (!gifUrl || !container) return;

    const img = new Image();
    img.onload = () => {
        container.style.transition = 'background-image 0.8s ease-in-out';
        container.style.backgroundImage = `
            linear-gradient(
                to bottom,
                rgba(10, 15, 30, 0.75),
                rgba(10, 15, 30, 0.85)
            ),
            url('${gifUrl}')
        `;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
        container.style.backgroundRepeat = 'no-repeat';
        container.style.backgroundAttachment = 'fixed';
    };
    img.onerror = () => {
        console.error('Error cargando GIF:', gifUrl);
    };
    img.src = gifUrl;
}

export function clearGifBackground(container) {
    if (!container) return;
    container.style.backgroundImage = 'none';
}

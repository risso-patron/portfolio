const GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs/search';

const ALLOWED_ORIGINS = [
    'https://risso-patron.com',
    'https://www.risso-patron.com',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://localhost:8080',
];

function sendJson(res, status, body) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(status).send(JSON.stringify(body));
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return sendJson(res, 405, { error: 'Method not allowed' });
    }

    const origin = req.headers.origin;
    if (origin) {
        if (!ALLOWED_ORIGINS.includes(origin)) {
            return sendJson(res, 403, { error: 'Forbidden' });
        }
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
    }

    const apiKey = process.env.GIPHY_API_KEY;
    if (!apiKey) {
        return sendJson(res, 500, { error: 'Missing GIPHY_API_KEY' });
    }

    const {
        q,
        limit = '50',
        rating = 'g',
        lang = 'es'
    } = req.query;

    if (!q) {
        return sendJson(res, 400, { error: 'Query requires q' });
    }

    // Valores acotados: el proxy no acepta contenido no apto ni consultas enormes.
    const safeLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 25, 1), 50);
    const safeRating = ['g', 'pg'].includes(String(rating)) ? String(rating) : 'g';
    const safeLang = /^[a-z]{2}$/.test(String(lang)) ? String(lang) : 'es';

    const params = new URLSearchParams({
        api_key: apiKey,
        q: String(q).slice(0, 50),
        limit: String(safeLimit),
        rating: safeRating,
        lang: safeLang
    });

    try {
        const response = await fetch(`${GIPHY_BASE_URL}?${params.toString()}`);
        const data = await response.json();
        return sendJson(res, response.status, data);
    } catch {
        return sendJson(res, 502, { error: 'Upstream service unavailable' });
    }
}

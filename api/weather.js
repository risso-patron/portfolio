const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

function sendJson(res, status, body) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=300');
    res.status(status).send(JSON.stringify(body));
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return sendJson(res, 405, { error: 'Method not allowed' });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        return sendJson(res, 500, { error: 'Missing OPENWEATHER_API_KEY' });
    }

    const { q, lat, lon, units = 'metric', lang = 'es' } = req.query;
    if (!q && (!lat || !lon)) {
        return sendJson(res, 400, { error: 'Query requires q or lat/lon' });
    }

    const params = new URLSearchParams({
        appid: apiKey,
        units: String(units),
        lang: String(lang)
    });

    if (q) {
        params.set('q', String(q));
    } else {
        params.set('lat', String(lat));
        params.set('lon', String(lon));
    }

    try {
        const response = await fetch(`${WEATHER_BASE_URL}?${params.toString()}`);
        const data = await response.json();
        return sendJson(res, response.status, data);
    } catch (error) {
        return sendJson(res, 502, { error: 'Upstream weather service failed', detail: error.message });
    }
}

const express = require('express');
const app = express();
const port = 3000;
const API_KEY = 'cd831f85';

// Use dynamic import for node-fetch
async function fetchData(query) {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
}

app.use(express.json());
app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
    const query = req.query.query;

    try {
        const data = await fetchData(query);
        res.json(data.Search || []);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

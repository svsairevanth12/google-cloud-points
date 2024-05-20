const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/check-points', async (req, res) => {
    const { profileLink } = req.body;
    try {
        const response = await axios.get(profileLink);
        const points = parseProfileHTML(response.data);
        res.json({ points });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

function parseProfileHTML(html) {
    const $ = cheerio.load(html);
    const skillBadges = $('.your-skill-badge-class').length;
    const certificationBadges = $('.your-certification-badge-class').length;
    return (skillBadges * 2) + certificationBadges;
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const PORT = 3000;

// i. Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Home page.');
});

// ii. About Route
app.get('/about', (req, res) => {
    res.send('This is the About page.');
});

// iii. Contact Route
app.get('/contact', (req, res) => {
    res.send('This is the Contact page.');
});

// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
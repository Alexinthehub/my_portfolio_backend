// test.js
const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
    console.log('📥 Health request RECEIVED!'); // <-- SEE IF THIS PRINTS
    res.json({ status: 'OK', message: 'Test server is alive!' });
});

app.get('/api/profile', (req, res) => {
    console.log('📥 Profile request RECEIVED!');
    res.json({
        success: true,
        data: {
            name: 'Test User',
            title: 'Test Developer',
            bio: 'This is a test response'
        }
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`✅ Test server running on http://localhost:${PORT}`);
    console.log(`👉 Try: curl http://127.0.0.1:${PORT}/api/health`);
});
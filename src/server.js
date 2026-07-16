// src/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const profileRoutes = require('./routes/profileRoutes');
const currentProjectRoutes = require('./routes/currentProjectRoutes');
const certificateRoutes = require('./routes/certificateRoutes');

const app = express();

// --- Middleware ---
const cors = require('cors');

// Add this BEFORE your routes
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://my-portfolio-frontend-alex113.vercel.app',   // Your Vercel URL (no trailing slash)
    'https://my-portfolio-frontend-nls09ytly-alex113.vercel.app',  // Alternative Vercel URL
  ],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


// --- Routes ---
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/current-projects', currentProjectRoutes);
app.use('/api/certificates', certificateRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is alive!' });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
});

// --- START THE SERVER **IMMEDIATELY** (BEFORE DB CONNECT) ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// --- CONNECT TO DATABASE (DO NOT BLOCK THE SERVER) ---
const connectDB = async () => {
    try {
        console.log('⏳ Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully!');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        // The server will still run, but the /api/profile route will return a 500 error
    }
};
connectDB();
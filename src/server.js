// =============================================
// DEPENDENCIES
// =============================================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// =============================================
// ROUTE IMPORTS
// =============================================
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const currentProjectRoutes = require('./routes/currentProjectRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const authRoutes = require('./routes/authRoutes');

// =============================================
// APP INITIALIZATION
// =============================================
const app = express();
const PORT = process.env.PORT || 5001;

// =============================================
// MIDDLEWARE
// =============================================
app.use(
  cors({
    origin: 'https://alexmwendwa.rweb.site',
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
        connectSrc: ["'self'", "https://alexmwendwa.rweb.site"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================
// DATABASE CONNECTION
// =============================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// =============================================
// ROUTES
// =============================================
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/current-projects', currentProjectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/admin', authRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Portfolio API is running' });
});

// ✅ ROOT ROUTE – returns API info
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Portfolio API is running!',
    version: '1.0.0',
    endpoints: {
      profile: '/api/profile',
      projects: '/api/projects',
      certificates: '/api/certificates',
      contact: '/api/contact',
      'current-projects': '/api/current-projects',
      admin: '/api/admin/login',
      health: '/api/health',
    },
  });
});

// =============================================
// START SERVER
// =============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
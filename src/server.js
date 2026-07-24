// =============================================
// DEPENDENCIES
// =============================================
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// =============================================
// ROUTE IMPORTS (Adjust paths if your routes are in different folders)
// =============================================
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const currentProjectRoutes = require('./routes/currentProjects');
const certificateRoutes = require('./routes/certificates');
const adminRoutes = require('./routes/admin');

// =============================================
// APP INITIALIZATION
// =============================================
const app = express();
const PORT = process.env.PORT || 5001;

// =============================================
// MIDDLEWARE
// =============================================

// 1. CORS - Allow YOUR specific frontend domain
app.use(
  cors({
    origin: 'https://alexmwendwa.rweb.site', // Your exact live frontend
    credentials: true,
  })
);

// 2. HELMET with FIXED CSP (Overrides the default strict policy)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
        // CRITICAL: Allows your frontend to call this backend
        connectSrc: ["'self'", "https://alexmwendwa.rweb.site"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// 3. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================
// DATABASE CONNECTION
// =============================================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// =============================================
// ROUTES (Matches your exact API endpoints)
// =============================================
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/current-projects', currentProjectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Portfolio API is running' });
});

// =============================================
// START SERVER
// =============================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
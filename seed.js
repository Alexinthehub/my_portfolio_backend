// seed.js
console.log('🚀 Seed script started!');

// 1. Load environment variables
require('dotenv').config();

// 2. Import dependencies (EACH ONLY ONCE)
const mongoose = require('mongoose');
const Profile = require('./src/models/Profile');

// --- DEBUG: Check what we imported ---
console.log('📄 Profile.js successfully loaded!');
console.log('🔍 Profile type:', typeof Profile);
console.log('🔍 Profile value:', Profile);
// -------------------------------------

// 3. Your personal data (CHANGE THESE TO YOUR REAL INFO!)
const yourProfileData = {
    name: 'Alex Mwendwa', 
    title: 'Full Stack Developer & Problem Solver',
    bio: "I'm a passionate developer who builds elegant solutions to complex problems.",
    avatar: 'https://via.placeholder.com/200',
    resumeUrl: 'https://your-resume-link.com/resume.pdf',
    socialLinks: {
        github: 'https://github.com/Alexinthehub',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://x.com/Mwendwa_Ke1',
        email: 'alexandermwendwa3@gmail.com' 
    }
};

// 4. The seeding function
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('📦 Connected to MongoDB for seeding...');

        await Profile.deleteMany({});
        console.log('🗑️  Removed existing profiles (if any)');

        const createdProfile = await Profile.create(yourProfileData);
        console.log('✅ Profile seeded successfully!');
        console.log('👤 Profile Name:', createdProfile.name);

        await mongoose.connection.close();
        console.log('🔌 Database connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

// 5. Run the seeding
seedDatabase();
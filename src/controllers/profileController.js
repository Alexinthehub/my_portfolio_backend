// src/controllers/profileController.js

// 1. Import the Profile Model (so we can talk to the database)
const Profile = require('../models/Profile');

// 2. Define the Controller functions (the logic)

// --- Get the single profile (we only have one) ---
const getProfile = async (req, res) => {
    try {
        // Find the first profile in the database
        const profile = await Profile.findOne();

        // If no profile exists, return a 404 (Not Found) error
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found. Please run the seed script.'
            });
        }

        // Success! Send back the profile data with a 200 (OK) status
        res.status(200).json({
            success: true,
            data: profile
        });

    } catch (error) {
        // If something goes wrong (e.g., database crash), catch it here
        console.error('Error fetching profile:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching profile'
        });
    }
};

// --- (We will add updateProfile here later for the Admin Panel) ---

// 3. Export the functions so the Routes file can use them
module.exports = {
    getProfile
};

const updateProfile = async (req, res) => {
    try {
        // Find the profile (we only have one) and update it with the request body
        // `new: true` returns the updated document
        // `runValidators: true` ensures required fields are checked again
        const profile = await Profile.findOneAndUpdate(
            {}, // Empty filter finds the first document
            req.body,
            { new: true, runValidators: true }
        );

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found. Please run the seed script.'
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating profile'
        });
    }
};

module.exports = { getProfile, updateProfile };
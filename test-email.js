// test-email.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
    try {
        console.log('📧 Testing email configuration...');
        console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
        console.log('📧 EMAIL_PASS:', process.env.EMAIL_PASS ? '✓ Set' : '✗ Missing');

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify the connection
        console.log('⏳ Verifying connection...');
        await transporter.verify();
        console.log('✅ Connection verified! Gmail credentials are correct.');

        // Send a test email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Test Email from Portfolio Backend',
            html: '<h1>🎉 It works!</h1><p>Your email configuration is correct.</p>'
        };

        console.log('⏳ Sending test email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully!');
        console.log('📧 Message ID:', info.messageId);

        process.exit(0);
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    }
};

testEmail();
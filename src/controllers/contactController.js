// src/controllers/contactController.js
const ContactMessage = require('../models/ContactMessage');
const { Resend } = require('resend');

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Send a contact message using Resend ---
const sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1. Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message'
            });
        }

        // 2. Save to database
        const contact = await ContactMessage.create({ name, email, message });

        // 3. Send email via Resend
        try {
            const senderEmail = process.env.RESEND_SENDER_EMAIL || 'alexandermwendwa3@gmail.com';
            
            const { data, error } = await resend.emails.send({
                from: `${name} <${senderEmail}>`,
                to: [senderEmail],
                subject: `New Portfolio Message from ${name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                    <hr>
                    <p><small>Sent from your portfolio website</small></p>
                `,
                replyTo: email,
            });

            if (error) {
                console.error('❌ Resend error:', error);
            } else {
                console.log('📧 Email sent successfully via Resend! ID:', data?.id);
            }

        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError.message);
            // We still return success because the message was saved to DB
        }

        // 4. Respond to the frontend
        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.'
        });

    } catch (error) {
        console.error('Error sending message:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while sending message'
        });
    }
};

// --- GET all messages (Admin only) ---
const getMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching messages'
        });
    }
};

// --- DELETE a message (Admin only) ---
const deleteMessage = async (req, res) => {
    try {
        const message = await ContactMessage.findByIdAndDelete(req.params.id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting message:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting message'
        });
    }
};

// --- MARK a message as read (Admin only) ---
const markAsRead = async (req, res) => {
    try {
        const message = await ContactMessage.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true, runValidators: true }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found'
            });
        }

        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('Error marking message as read:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating message'
        });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    deleteMessage,
    markAsRead
};
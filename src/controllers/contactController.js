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
        console.log('💾 Message saved to database:', contact._id);

        // 3. Send email via Resend
        try {
            const senderEmail = process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev';
            const recipientEmail = process.env.RECIPIENT_EMAIL || 'alexandermwendwa3@gmail.com';

            console.log('📧 Sending email via Resend...');
            console.log('📤 From:', `${name} <${senderEmail}>`);
            console.log('📥 To:', recipientEmail);
            console.log('📋 Subject:', `New Portfolio Message from ${name}`);

            const { data, error } = await resend.emails.send({
                from: `${name} <${senderEmail}>`,
                to: [recipientEmail],
                replyTo: email,
                subject: `New Portfolio Message from ${name}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>New Portfolio Message</title>
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: #02060E; color: #5DD62C; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; border-top: none; }
                            .field { margin-bottom: 16px; }
                            .label { font-weight: bold; color: #555; }
                            .value { color: #222; }
                            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #999; }
                            .green { color: #5DD62C; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h2>📬 New Portfolio Message</h2>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">👤 Name:</div>
                                <div class="value">${name}</div>
                            </div>
                            <div class="field">
                                <div class="label">📧 Email:</div>
                                <div class="value">${email}</div>
                            </div>
                            <div class="field">
                                <div class="label">💬 Message:</div>
                                <div class="value">${message}</div>
                            </div>
                            <hr>
                            <p style="font-size: 14px; color: #666;">
                                Reply directly to <strong>${email}</strong> to respond.
                            </p>
                        </div>
                        <div class="footer">
                            Sent from Alex Mwendwa's Portfolio<br>
                            <a href="${process.env.FRONTEND_URL || 'https://my-portfolio-frontend-alex113.vercel.app'}" style="color: #5DD62C;">Visit Portfolio</a>
                        </div>
                    </body>
                    </html>
                `,
            });

            if (error) {
                console.error('❌ Resend error:', error);
            } else {
                console.log('✅ Email sent successfully via Resend! ID:', data?.id);
            }

        } catch (emailError) {
            console.error('❌ Email sending failed:', emailError.message);
            console.error('📋 Full email error:', emailError);
            // We still return success because the message was saved to DB
        }

        // 4. Respond to the frontend
        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                createdAt: contact.createdAt
            }
        });

    } catch (error) {
        console.error('❌ Error sending message:', error.message);
        console.error('📋 Full error:', error);
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
        console.log(`📋 Fetched ${messages.length} messages`);
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (error) {
        console.error('❌ Error fetching messages:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching messages'
        });
    }
};

// --- GET a single message (Admin only) ---
const getMessageById = async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);
        
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
        console.error('❌ Error fetching message:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching message'
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

        console.log(`🗑️ Message deleted: ${message._id} from ${message.name}`);
        res.status(200).json({
            success: true,
            message: 'Message deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting message:', error.message);
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

        console.log(`📖 Message marked as read: ${message._id}`);
        res.status(200).json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('❌ Error marking message as read:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating message'
        });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    getMessageById,
    deleteMessage,
    markAsRead
};
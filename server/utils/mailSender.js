const nodemailer = require("nodemailer");
require('dotenv').config()

// Create a single transporter instance that will be reused
let transporter;

// Initialize transporter once
function createTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransporter({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // TLS
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            // Connection pooling for better performance
            pool: true,
            maxConnections: 5,
            maxMessages: 100,
            // Connection timeout
            connectionTimeout: 60000, // 1 minute
            greetingTimeout: 30000,   // 30 seconds
            socketTimeout: 60000,     // 1 minute
            // Rate limiting
            rateDelta: 1000,          // 1 second
            rateLimit: 5              // 5 emails per second
        });
        
        console.log("📧 Email transporter initialized with connection pooling");
    }
    return transporter;
}

const mailSender = async (email, title, body) => {
    try {
        // Get or create the transporter instance
        const emailTransporter = createTransporter();
        
        const mailOptions = {
            from: `"Study Notion | EdTech Platform" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
            // Add priority for OTP emails
            priority: title.toLowerCase().includes('otp') || title.toLowerCase().includes('verification') ? 'high' : 'normal'
        };

        const info = await emailTransporter.sendMail(mailOptions);
        
        console.log(`✅ Email sent successfully to ${email}:`, {
            messageId: info.messageId,
            accepted: info.accepted,
            response: info.response
        });
        
        return info;
    } catch (error) {
        console.error(`❌ Email sending failed to ${email}:`, {
            error: error.message,
            code: error.code,
            responseCode: error.responseCode
        });
        
        // Don't return the error object, throw it so it can be caught upstream
        throw error;
    }
}

// Gracefully close the transporter when the process exits
process.on('SIGINT', () => {
    if (transporter) {
        transporter.close();
        console.log("📧 Email transporter closed gracefully");
    }
});

process.on('SIGTERM', () => {
    if (transporter) {
        transporter.close();
        console.log("📧 Email transporter closed gracefully");
    }
});

module.exports = mailSender;
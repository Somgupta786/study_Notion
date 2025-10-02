const mailSender = require("./mailSender");

// Email service warm-up function
const warmUpEmailService = async () => {
    try {
        console.log("🔥 Warming up email service...");
        
        // Send a test email to warm up the connection
        const warmupEmail = process.env.MAIL_USER; // Send to self
        const testSubject = "Email Service Warmup - Study Notion";
        const testBody = `
            <h2>Email Service Warmup</h2>
            <p>This is a warmup email to initialize the email service.</p>
            <p>Timestamp: ${new Date().toISOString()}</p>
            <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
        `;

        const startTime = Date.now();
        await mailSender(warmupEmail, testSubject, testBody);
        const endTime = Date.now();
        
        console.log(`✅ Email service warmed up successfully in ${endTime - startTime}ms`);
        return true;
    } catch (error) {
        console.error("❌ Email service warmup failed:", error.message);
        return false;
    }
};

module.exports = { warmUpEmailService };
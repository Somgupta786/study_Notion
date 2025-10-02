const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

// Test email performance endpoint
exports.testEmailPerformance = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        console.log(`🧪 Testing email performance for: ${email}`);
        const startTime = Date.now();

        // Send test email
        const testOtp = "123456";
        const mailResponse = await mailSender(
            email,
            "Email Performance Test - Study Notion",
            emailTemplate(testOtp)
        );

        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`✅ Test email sent in ${duration}ms`);

        return res.status(200).json({
            success: true,
            message: "Test email sent successfully",
            performance: {
                duration: `${duration}ms`,
                messageId: mailResponse.messageId,
                accepted: mailResponse.accepted,
                response: mailResponse.response
            }
        });

    } catch (error) {
        console.error(`❌ Email test failed:`, error);
        
        return res.status(500).json({
            success: false,
            message: "Email test failed",
            error: error.message
        });
    }
};

// Email service health check
exports.emailHealthCheck = async (req, res) => {
    try {
        console.log("🏥 Performing email service health check");
        
        const healthInfo = {
            service: "Email Service",
            status: "healthy",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            mailHost: process.env.MAIL_HOST || 'not configured',
            mailUser: process.env.MAIL_USER ? 'configured' : 'not configured'
        };

        return res.status(200).json({
            success: true,
            message: "Email service is healthy",
            health: healthInfo
        });

    } catch (error) {
        console.error(`❌ Email health check failed:`, error);
        
        return res.status(500).json({
            success: false,
            message: "Email service health check failed",
            error: error.message
        });
    }
};
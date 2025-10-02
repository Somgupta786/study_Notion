const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	try {
		console.log(`📧 Starting email send process for ${email}`);
		const startTime = Date.now();
		
		const mailResponse = await mailSender(
			email,
			"OTP Verification - Study Notion",
			emailTemplate(otp)
		);
		
		const endTime = Date.now();
		const emailDuration = endTime - startTime;
		
		console.log(`✅ Email sent successfully to ${email} in ${emailDuration}ms:`, {
			messageId: mailResponse.messageId,
			accepted: mailResponse.accepted,
			duration: `${emailDuration}ms`
		});
		
		return mailResponse;
	} catch (error) {
		console.error(`❌ Email sending failed for ${email}:`, {
			error: error.message,
			code: error.code,
			responseCode: error.responseCode
		});
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
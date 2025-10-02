const express = require("express");

const app = express();

const userRoutes = require("./routes/User");
const paymentRoutes = require("./routes/Payments");
const profileRoutes = require("./routes/Profile");
const CourseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const fileUpload = require("express-fileupload");
const { cloudnairyconnect } = require("./config/cloudinary");

const dotenv = require("dotenv");
dotenv.config();

const { warmUpEmailService } = require("./utils/emailWarmup");

const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: JSON.parse(process.env.CORS_ORIGIN),
    credentials: true,
    maxAge: 14400,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudnairyconnect();

app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/course", CourseRoutes);

app.use("/api/v1/contact", require("./routes/ContactUs"));

app.use("/api/v1/email", require("./routes/EmailTest"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Study Notion API - Optimized for Production",
    version: "2.0.0",
    status: "healthy"
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Study Notion Server is running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Mail Host: ${process.env.MAIL_HOST || 'not configured'}`);
  
  // Warm up email service in background (don't block server startup)
  setTimeout(async () => {
    try {
      await warmUpEmailService();
    } catch (error) {
      console.error("Email warmup error (non-blocking):", error.message);
    }
  }, 5000); // Delay 5 seconds to let server fully start
});

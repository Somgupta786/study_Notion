const express = require("express");
const router = express.Router();

const { testEmailPerformance, emailHealthCheck } = require("../controllers/EmailTest");
const { auth } = require("../middlewares/auth");

// Test email performance (requires authentication)
router.post("/test-performance", auth, testEmailPerformance);

// Email service health check (public endpoint)
router.get("/health", emailHealthCheck);

module.exports = router;
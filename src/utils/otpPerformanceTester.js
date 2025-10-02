// OTP Performance Testing Utility
// Add this to your browser console or create a separate test page

class OTPPerformanceTester {
    constructor(baseURL) {
        this.baseURL = baseURL || 'https://study-notion-ylza.onrender.com/api/v1';
        this.results = [];
    }

    // Test OTP sending performance
    async testOTPSend(email) {
        try {
            console.log(`🧪 Testing OTP send performance for: ${email}`);
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}/auth/sendotp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const endTime = Date.now();
            const duration = endTime - startTime;
            const data = await response.json();

            const result = {
                email,
                duration: `${duration}ms`,
                success: data.success,
                message: data.message,
                timestamp: new Date().toISOString()
            };

            this.results.push(result);
            console.log('📊 OTP Test Result:', result);

            return result;
        } catch (error) {
            console.error('❌ OTP Test Error:', error);
            return {
                email,
                duration: 'failed',
                success: false,
                message: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    // Test email service health
    async testEmailHealth() {
        try {
            console.log('🏥 Testing email service health...');
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}/email/health`);
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            const data = await response.json();

            console.log(`✅ Health check completed in ${duration}ms:`, data);
            return data;
        } catch (error) {
            console.error('❌ Health check failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Test email performance (requires authentication)
    async testEmailPerformance(email, token) {
        try {
            console.log(`📧 Testing email performance for: ${email}`);
            const startTime = Date.now();

            const response = await fetch(`${this.baseURL}/email/test-performance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email })
            });

            const endTime = Date.now();
            const duration = endTime - startTime;
            const data = await response.json();

            console.log(`📊 Email performance test completed in ${duration}ms:`, data);
            return data;
        } catch (error) {
            console.error('❌ Email performance test failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Run multiple OTP tests to get average performance
    async runPerformanceTest(email, iterations = 3) {
        console.log(`🔄 Running ${iterations} OTP performance tests...`);
        
        const results = [];
        for (let i = 0; i < iterations; i++) {
            console.log(`Test ${i + 1}/${iterations}`);
            const result = await this.testOTPSend(email);
            results.push(result);
            
            // Wait 2 seconds between tests
            if (i < iterations - 1) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        const successfulTests = results.filter(r => r.success && r.duration !== 'failed');
        const durations = successfulTests.map(r => parseInt(r.duration.replace('ms', '')));
        
        const avgDuration = durations.length > 0 ? 
            (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(0) : 0;

        const summary = {
            totalTests: iterations,
            successfulTests: successfulTests.length,
            averageDuration: `${avgDuration}ms`,
            minDuration: durations.length > 0 ? `${Math.min(...durations)}ms` : 'N/A',
            maxDuration: durations.length > 0 ? `${Math.max(...durations)}ms` : 'N/A',
            results
        };

        console.log('📈 Performance Test Summary:', summary);
        return summary;
    }

    // Get all test results
    getResults() {
        return this.results;
    }

    // Clear test results
    clearResults() {
        this.results = [];
        console.log('🗑️ Test results cleared');
    }
}

// Usage Examples:
// const tester = new OTPPerformanceTester();
// await tester.testEmailHealth();
// await tester.testOTPSend('test@example.com');
// await tester.runPerformanceTest('test@example.com', 5);

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OTPPerformanceTester;
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Profile = require('./models/Profile');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

async function createDemoUser() {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email: 'som2212044@akgec.ac.in' });
        
        if (existingUser) {
            console.log('📌 Demo user already exists');
            
            // Update password if needed
            const hashedPassword = await bcrypt.hash('Som@7866', 10);
            await User.findOneAndUpdate(
                { email: 'som2212044@akgec.ac.in' },
                { password: hashedPassword },
                { new: true }
            );
            console.log('✅ Demo user password updated');
            
        } else {
            // Create profile first
            const profileDetails = await Profile.create({
                gender: null,
                dateOfBirth: null,
                about: "Demo Student Account for Study Notion Platform",
                contactNumber: null,
            });

            // Hash password
            const hashedPassword = await bcrypt.hash('Som@7866', 10);

            // Create demo user
            const demoUser = await User.create({
                firstName: 'Som',
                lastName: 'Gupta', 
                email: 'som2212044@akgec.ac.in',
                password: hashedPassword,
                accountType: 'Student',
                approved: true,
                additionalDetails: profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=Som Gupta`,
                courses: [],
                courseProgress: []
            });

            console.log('✅ Demo user created successfully');
            console.log('📧 Email:', demoUser.email);
            console.log('🔑 Password: Som@7866');
            console.log('👤 Account Type:', demoUser.accountType);
        }
        
    } catch (error) {
        console.error('❌ Error creating demo user:', error);
    } finally {
        mongoose.disconnect();
        console.log('📤 Disconnected from MongoDB');
    }
}

createDemoUser();
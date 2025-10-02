# 🗄️ Database Seeding Guide for Study Notion

This guide will help you populate your Study Notion database with dummy data for testing and demonstration purposes.

## 🚀 Quick Start

### Option 1: Quick Seed (Recommended for first-time setup)
```bash
# Navigate to server directory
cd server

# Run quick seeding (creates essential data only)
npm run quick-seed
```

**Quick Seed Creates:**
- ✅ 3 Course Categories (Web Development, Data Science, Mobile Development)
- ✅ 1 Admin User
- ✅ 1 Sample Instructor  
- ✅ 1 Sample Student

### Option 2: Full Database Seed (Complete dummy data)
```bash
# Navigate to server directory
cd server

# Run full seeding (creates comprehensive dummy data)
npm run seed
```

**Full Seed Creates:**
- ✅ 6 Course Categories
- ✅ 1 Admin User
- ✅ 4 Instructor Users
- ✅ 5 Student Users  
- ✅ 6 Complete Courses with sections and lessons
- ✅ Course ratings and reviews
- ✅ Student enrollments

## 🔐 Default Login Credentials

After running either seeding option, you can use these credentials:

### Admin Access
- **Email:** `admin@studynotion.com`
- **Password:** `admin123`
- **Features:** Create categories, manage platform

### Instructor Access  
- **Email:** `instructor@studynotion.com` (quick-seed) or `john.smith@instructor.com` (full-seed)
- **Password:** `instructor123`
- **Features:** Create courses, manage students, view analytics

### Student Access
- **Email:** `student@studynotion.com` (quick-seed) or `alex.williams@student.com` (full-seed)  
- **Password:** `student123`
- **Features:** Enroll in courses, track progress, rate courses

## 📚 Sample Courses (Full Seed Only)

The full seed creates these courses:
1. **Complete React Development Bootcamp** - ₹4,999
2. **Data Science with Python Masterclass** - ₹6,999  
3. **React Native Mobile App Development** - ₹5,999
4. **AWS Cloud Architecture & DevOps** - ₹7,999
5. **Machine Learning & AI Fundamentals** - ₹8,999
6. **Ethical Hacking & Cybersecurity** - ₹6,499

Each course includes:
- ✅ 3 Modules/Sections
- ✅ 4 Lessons per module (12 total lessons)
- ✅ Student enrollments
- ✅ Ratings and reviews
- ✅ Complete course metadata

## 🏗️ Course Categories Created

1. **Web Development** - Modern web technologies and frameworks
2. **Data Science** - Data analysis and machine learning  
3. **Mobile Development** - iOS and Android app development
4. **DevOps & Cloud** - Cloud computing and deployment (full seed only)
5. **Artificial Intelligence** - AI and machine learning (full seed only)
6. **Cybersecurity** - Security and ethical hacking (full seed only)

## ⚠️ Important Notes

### Before Seeding:
- ✅ Ensure your MongoDB connection is working
- ✅ Make sure your `.env` file is properly configured
- ✅ The seeding process will **clear existing data** in full seed mode

### After Seeding:
- ✅ You can immediately start testing all features
- ✅ Admin user can create additional categories
- ✅ Instructors can create new courses
- ✅ Students can enroll in existing courses

## 🛠️ Manual Seeding Process (Alternative)

If you prefer to add data manually:

1. **Create Admin User:**
   - Sign up as Student/Instructor
   - Go to MongoDB and change `accountType` to "Admin"

2. **Create Categories (As Admin):**
   - Login as admin
   - Go to Dashboard → Admin Panel
   - Create categories before adding courses

3. **Add Courses (As Instructor):**
   - Login as instructor
   - Go to Dashboard → Add Course
   - Fill course details and publish

## 🔧 Troubleshooting

### Connection Issues:
```bash
# Check if MongoDB is running
# Verify MONGODB_URL in .env file
```

### Seeding Errors:
```bash
# Clear database and retry
# Check console for specific error messages
# Ensure all required models are properly defined
```

### Permission Issues:
```bash
# Make sure user roles are correctly assigned
# Verify JWT_SECRET is properly set
```

## 📈 Testing Features After Seeding

### Test Admin Features:
1. ✅ Login as admin
2. ✅ Create new categories
3. ✅ View all users and courses

### Test Instructor Features:
1. ✅ Login as instructor  
2. ✅ View instructor dashboard
3. ✅ Create new courses
4. ✅ View student enrollments

### Test Student Features:
1. ✅ Login as student
2. ✅ Browse course catalog
3. ✅ Enroll in courses (with dummy payment)
4. ✅ View enrolled courses
5. ✅ Rate and review courses

## 🎯 Next Steps

After seeding your database:
1. **Test Authentication** - Try logging in with different roles
2. **Explore Features** - Navigate through all dashboards  
3. **Add Razorpay Keys** - Enable real payment processing
4. **Customize Content** - Modify courses and categories as needed
5. **Production Setup** - Remove dummy data before going live

Happy coding! 🚀
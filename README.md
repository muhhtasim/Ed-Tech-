Ed-Tech 
Online Programming Learning Platform 
Executive Summary 
We propose the development of an Online Programming Learning Platform where users can learn 
programming through courses, guidelines, and problem-solving resources. The platform will allow users 
to create accounts, browse available courses, enroll in both free and paid courses, and track their learning 
progress. 
The system will also allow course creators or administrators to upload new courses and manage learning 
content. Users will be able to search for courses, filter them based on price range or alphabetical order, 
and interact with learning materials. 
The project will demonstrate the implementation of a complete full-stack system including frontend user 
interface, backend application logic, and a MySQL database for data storage and management. 
The goal of this system is to provide a structured and user-friendly learning environment for 
beginner programmers. 
Technical Architecture 
Technology Stack 
Frontend 
• HTML 
• CSS 
• JavaScript 
Backend 
• Node.js 
• Express.js 
Database 
• MySQL (via XAMPP) 
System Architecture 
The system architecture will consist of three major components: 
1. Frontend Layer 
The frontend will provide a user-friendly interface for interaction with the system. 
Features include: 
• Homepage 
• Course listing 
• Search and filtering 
• User dashboard 
• Registration and login pages 
2. Backend Layer 
The backend will manage: 
• User authentication 
• Course management 
• Database communication 
• API services for frontend 
Backend technologies include: 
• Node.js 
• Express.js 
• REST API 
3. Database Layer 
The database will store all system data including: 
• User information 
• Course details 
• Enrollments 
• Learning progress 
• Posts created by users 
MySQL will be used to maintain structured relational data. 
Feature Implementation Plan 
The platform will include several functional modules. 
User Panel Features 
1. User Registration and Login 
Users will be able to create an account and log into the system. 
Features: 
• User registration 
• Secure login authentication 
• Password protection 
• Session management 
2. Course Browsing System 
Users can explore available courses. 
Features: 
• View all courses 
• View course details 
• Course price information 
• Enroll in courses 
3. Create Post (Create Course) 
Authorized users or instructors can create new courses. 
Features: 
• Course title 
• Course description 
• Course price 
• Upload learning resources 
• Update course information 
• Delete course 
This implements CRUD functionality. 
4. Search System 
Users can search for courses using keywords. 
Example: 
Search: 
• Programming 
• C++ 
• Data Structures 
Results will show matching courses. 
5. Filter System 
Users can filter courses based on different criteria. 
Filters include: 
• Price range 
• Alphabetical order (A–Z) 
• Free courses 
• Paid courses 
6. Guideline / Learning Resources 
Each course will contain structured learning resources such as: 
• Video links 
• Articles 
• Tutorials 
• Programming problems 
Users can track their learning progress. 
7. User Dashboard 
Each user will have a personal dashboard. 
Dashboard features: 
• User profile information 
• Enrolled courses 
• Learning progress tracking 
• Account settings 
8. Update User Information 
Users can update their profile information from the dashboard. 
Examples: 
• Name 
• Email 
• Password 
• Profile information 
Admin / Creator Features 
1. Course Management 
Admins or course creators can: 
• Create courses 
• Update courses 
• Delete courses 
• Manage course resources 
2. User Management 
Admin can: 
• View registered users 
• Monitor user activity 
• Manage system data 
Database Design 
The database will consist of several relational tables. 
Main tables include: 
Users Table 
Stores user information. 
Fields: 
• user_id (Primary Key) 
• name 
• email 
• password 
• role 
• created_at 
Courses Table 
Stores course information. 
Fields: 
• course_id (Primary Key) 
• course_name 
• description 
• price 
• created_by 
• created_at 
Enrollments Table 
Tracks course enrollments. 
Fields: 
• enrollment_id 
• user_id 
• course_id 
• progress 
Resources Table 
Stores learning materials. 
Fields: 
• resource_id 
• course_id 
• resource_type 
• resource_link 
Posts Table 
Stores newly created courses/posts. 
Fields: 
• post_id 
• user_id 
• title 
• description 
• created_at 
CRUD Operations 
The system will implement full CRUD operations. 
Operation 
Create 
Read 
Update 
Delete 
Description 
Register users, create courses 
View courses, resources 
Update user profile, edit courses 
Delete courses or posts 
User Interface Design 
The UI design will follow a simple and clean layout. 
Main pages include: 
1. Homepage 
2. Guidelines page 
3. Courses page 
4. User Dashboard 
5. Login / Registration page 
The interface will be responsive and easy to use. 
Security Measures 
Basic security features will be implemented. 
Security measures include: 
• Password hashing 
• User authentication 
• Input validation 
• SQL injection protection 
Expected Outcome 
After completing this project, the system will provide: 
• A functional online learning platform 
• Proper database management 
• Secure user authentication 
• Dynamic course searching and filtering 
• Full CRUD database operations 
The project will demonstrate practical knowledge of database design, backend development, and 
frontend interface creation. 
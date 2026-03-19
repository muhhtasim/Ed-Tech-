# 🚀 Ed-Tech: Online Programming Learning Platform

## 📌 Executive Summary
This project is an **Online Programming Learning Platform** where users can learn programming through structured courses, guidelines, and problem-solving resources.

Users can:
- Create accounts  
- Browse and enroll in free or paid courses  
- Track their learning progress  

Course creators (admins/instructors) can:
- Upload and manage courses  
- Provide learning materials  

The system demonstrates a **full-stack application** using frontend, backend, and a relational database.

---

## 🏗️ Technical Architecture

### 💻 Technology Stack

#### Frontend
- HTML  
- CSS  
- JavaScript  

#### Backend
- Node.js  
- Express.js  

#### Database
- MySQL (via XAMPP)

---

## ⚙️ System Architecture

### 1️⃣ Frontend Layer
Provides user interaction and interface.

**Features:**
- Homepage  
- Course listing  
- Search & filtering  
- User dashboard  
- Login & registration  

---

### 2️⃣ Backend Layer
Handles core application logic.

**Responsibilities:**
- User authentication  
- Course management  
- API services (REST API)  
- Database communication  

---

### 3️⃣ Database Layer
Stores all system data.

**Includes:**
- Users  
- Courses  
- Enrollments  
- Learning progress  
- Posts  

---

## 🧩 Feature Implementation

### 👤 User Panel

#### 1. Authentication System
- User registration  
- Secure login  
- Password protection  
- Session management  

#### 2. Course Browsing
- View all courses  
- Course details  
- Pricing info  
- Enrollment system  

#### 3. Course Creation (CRUD)
Authorized users can:
- Create courses  
- Update courses  
- Delete courses  
- Upload learning materials  

#### 4. Search System
Search courses by keywords like:
- Programming  
- C++  
- Data Structures  

#### 5. Filter System
- Price range  
- Alphabetical (A–Z)  
- Free / Paid  

#### 6. Learning Resources
Each course includes:
- Video tutorials  
- Articles  
- Guides  
- Programming problems  

#### 7. User Dashboard
- Profile info  
- Enrolled courses  
- Progress tracking  
- Account settings  

#### 8. Profile Management
Users can update:
- Name  
- Email  
- Password  
- Profile info  

---

### 🛠️ Admin / Creator Panel

#### Course Management
- Create / Update / Delete courses  
- Manage course resources  

#### User Management
- View users  
- Monitor activity  
- Manage system data  

---

## 🗄️ Database Design

### 📋 Tables Overview

#### Users
| Field | Description |
|------|------------|
| user_id | Primary Key |
| name | User name |
| email | User email |
| password | Hashed password |
| role | User role |
| created_at | Account creation time |

#### Courses
| Field | Description |
|------|------------|
| course_id | Primary Key |
| course_name | Course title |
| description | Course details |
| price | Course price |
| created_by | Creator ID |
| created_at | Creation time |

#### Enrollments
| Field | Description |
|------|------------|
| enrollment_id | Primary Key |
| user_id | User reference |
| course_id | Course reference |
| progress | Learning progress |

#### Resources
| Field | Description |
|------|------------|
| resource_id | Primary Key |
| course_id | Course reference |
| resource_type | Video/Article/etc |
| resource_link | Resource URL |

#### Posts
| Field | Description |
|------|------------|
| post_id | Primary Key |
| user_id | Creator |
| title | Post title |
| description | Post content |
| created_at | Timestamp |

---

## 🔄 CRUD Operations

| Operation | Description |
|----------|------------|
| Create | Register users, create courses |
| Read | View courses and resources |
| Update | Edit profiles and courses |
| Delete | Remove courses/posts |

---

## 🎨 User Interface

### Pages
- Homepage  
- Guidelines Page  
- Courses Page  
- User Dashboard  
- Login / Registration  

✔ Clean and responsive design  
✔ Beginner-friendly UI  

---

## 🔐 Security Measures
- Password hashing  
- User authentication  
- Input validation  
- SQL injection protection  

---

## 🎯 Expected Outcome
After completion, this project will provide:

- ✅ Functional online learning platform  
- ✅ Structured database management  
- ✅ Secure authentication system  
- ✅ Dynamic course search & filtering  
- ✅ Full CRUD functionality  

---

## 📚 Learning Outcome
This project demonstrates:
- Full-stack development  
- Database design (MySQL)  
- Backend API development  
- Frontend UI implementation  

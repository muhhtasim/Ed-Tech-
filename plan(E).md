# Ed-Tech Platform — Implementation Plan & Progress Report

## 1. Project Overview
**Project Name:** Ed-Tech Learning Platform  
**Goal:** Build a comprehensive learning platform where students can browse and enroll in courses, and admins can manage the course catalog.

---

## 2. Technology Stack (Current)
- **Frontend:** React.js, Tailwind CSS, Lucide-react (Icons), Axios, React Router.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL (Local).
- **Authentication:** JWT concepts & LocalStorage based session management.

---

## 3. Progress Summary (Done ✅)

### Phase 1: Foundation & Database
- [x] Node.js and Express server setup.
- [x] MySQL database connection.
- [x] Created `users`, `courses`, and `enrollments` tables.
- [x] Added `university` field to the database schema.

### Phase 2: Authentication (Student & Admin)
- [x] **Registration:** User creation with name, email, password, role, and university.
- [x] **Login:** Email and password validation with session handling.
- [x] **UI Fix:** Resolved input box contrast issues to ensure typed text is clearly visible.

### Phase 3: Course & Learning Flow
- [x] **Course Listing:** Fetching and displaying courses from the database on Home and Course pages.
- [x] **Course Details:** Individual details view for every course.
- [x] **Enrollment:** Linking students to courses upon clicking 'Buy Now'.
- [x] **My Courses:** Dedicated page for students to view their enrolled courses.

### Phase 4: Admin Features
- [x] **Add Course:** Form for admins to upload new courses.
- [x] **Manage Courses:** Ability for admins to view the course list and delete entries (CRUD).
- [x] **Dynamic Navbar:** Filtering menu items based on user roles (Student vs. Admin).

---

## 4. Current Architecture Decision
- **Frontend-Backend separation:** Frontend and Backend running on separate ports (5173 and 5000).
- **Role-based UI:** Using `user.role` to grant specific privileges to Admins and Students.
- **Deployment Strategy:** Configured `public/_redirects` to prevent 404 errors on Netlify refresh.

---

## 5. Next Steps & Future Roadmap (Pending 🚀)

### Phase 5: Security & Protection (Immediate Next)
- [ ] **Route Protection:** Blocking access to Dashboard or Payment pages for unauthenticated users.
- [ ] **Admin Shield:** Preventing students from accessing `/add-course` or `/manage-courses` via direct URL entry.
- [ ] **Password Hashing:** Encrypting passwords using `bcrypt` before saving to the database.

### Phase 6: Search & Filtering
- [ ] **Search Bar:** Option to search for courses by name on the Home page.
- [ ] **Category Filter:** System to categorize and filter courses by subject.

### Phase 7: Live Deployment (Production)
- [ ] **Online DB:** Transferring the local MySQL database to a cloud hosting provider (e.g., Aiven or TiDB).
- [ ] **Backend Hosting:** Hosting the Node.js server on Render or Railway.
- [ ] **API URL Update:** Replacing `localhost` with the live production domain in the frontend.

---

## 6. Folder Structure
```txt
ed-tech-platform/
├─ backend/
│  ├─ db.js
│  ├─ server.js
│  └─ package.json
├─ frontend/
│  ├─ public/
│  │  └─ _redirects
│  ├─ src/
│  │  ├─ components/ (Navbar, Footer)
│  │  ├─ pages/ (Home, Login, Register, Dashboard, MyCourses, ManageCourses...)
│  │  └─ App.jsx
│  └─ package.json
└─ plan.md (You are here)
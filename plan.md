# Ed-Tech Platform — Implementation Plan & Progress Report

## 1. Project Overview
**Project Name:** Ed-Tech Learning Platform  
**Goal:** একটি পূর্ণাঙ্গ লার্নিং প্ল্যাটফর্ম তৈরি করা যেখানে ছাত্ররা কোর্স ব্রাউজ করতে পারবে, কিনতে পারবে এবং এডমিনরা কোর্স ম্যানেজ করতে পারবে।

---

## 2. Technology Stack (Current)
- **Frontend:** React.js, Tailwind CSS, Lucide-react (Icons), Axios, React Router.
- **Backend:** Node.js, Express.js.
- **Database:** MySQL (Local).
- **Authentication:** JWT concepts & LocalStorage based session management.

---

## 3. Progress Summary (Done ✅)

### Phase 1: Foundation & Database
- [x] Node.js ও Express সার্ভার সেটআপ।
- [x] MySQL ডাটাবেজ কানেকশন।
- [x] `users`, `courses`, এবং `enrollments` টেবিল তৈরি।
- [x] ডাটাবেজ কলামে `university` ফিল্ড যুক্ত করা।

### Phase 2: Authentication (Student & Admin)
- [x] **Registration:** নাম, ইমেইল, পাসওয়ার্ড, রোল এবং ইউনিভার্সিটিসহ ইউজার তৈরি।
- [x] **Login:** ইমেইল ও পাসওয়ার্ড ভ্যালিডেশন এবং সেশন হ্যান্ডলিং।
- [x] **UI Fix:** লগইন পেজে টাইপ করার সময় টেক্সট কালার এবং কন্টাস্টিং ঠিক করা।

### Phase 3: Course & Learning Flow
- [x] **Course Listing:** ডাটাবেজ থেকে কোর্স এনে হোম ও কোর্স পেজে দেখানো।
- [x] **Course Details:** প্রতিটি কোর্সের জন্য আলাদা ডিটেইলস ভিউ।
- [x] **Enrollment:** কোর্স কেনা এবং ডাটাবেজে স্টুডেন্টের সাথে কোর্স লিংক করা।
- [x] **My Courses:** স্টুডেন্টের কেনা কোর্সগুলো দেখার আলাদা পেজ।

### Phase 4: Admin Features
- [x] **Add Course:** এডমিন প্যানেল থেকে নতুন কোর্স আপলোড করার সুবিধা।
- [x] **Manage Courses:** কোর্স লিস্ট দেখা এবং ডিলিট করার সুবিধা (CRUD)।
- [x] **Dynamic Navbar:** রোলের (Student/Admin) ওপর ভিত্তি করে মেনু আইটেম ফিল্টার করা।

---

## 4. Current Architecture Decision
- **Frontend-Backend separation:** ফ্রন্টএন্ড এবং ব্যাকএন্ড আলাদা পোর্টে (5173 ও 5000) কাজ করছে।
- **Role-based UI:** `user.role` ব্যবহার করে এডমিন ও স্টুডেন্টকে আলাদা প্রিভিলেজ দেওয়া।
- **Deployment Strategy:** Netlify-তে রিফ্রেশ এরর বন্ধ করতে `public/_redirects` কনফিগার করা।

---

## 5. Next Steps & Future Roadmap (Pending 🚀)

### Phase 5: Security & Protection (Immediate Next)
- [ ] **Route Protection:** লগইন ছাড়া ড্যাশবোর্ড বা পেমেন্ট পেজ ব্লক করা।
- [ ] **Admin Shield:** সাধারণ স্টুডেন্ট যাতে ইউআরএল টাইপ করে `/add-course` বা `/manage-courses` এ ঢুকতে না পারে।
- [ ] **Password Hashing:** ডাটাবেজে পাসওয়ার্ড সেভ করার আগে `bcrypt` দিয়ে এনক্রিপ্ট করা।

### Phase 6: Search & Filtering
- [ ] **Search Bar:** হোম পেজে নাম দিয়ে কোর্স সার্চ করার অপশন।
- [ ] **Category Filter:** বিষয় অনুযায়ী কোর্স আলাদা করার ব্যবস্থা।

### Phase 7: Live Deployment (Production)
- [ ] **Online DB:** MySQL ডাটাবেজকে ক্লাউড হোস্টিংয়ে (যেমন Aiven) ট্রান্সফার করা।
- [ ] **Backend Hosting:** Render বা Railway-তে Node.js সার্ভার হোস্ট করা।
- [ ] **API URL Update:** ফ্রন্টএন্ডে `localhost` বদলে লাইভ ডোমেইন লিঙ্ক আপডেট করা।

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
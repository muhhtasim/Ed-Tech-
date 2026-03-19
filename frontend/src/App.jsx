import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components & Pages Import
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Guideline from './pages/Guideline';
import AddCourse from './pages/AddCourse';
import ManageCourses from './pages/ManageCourses'; // নতুন ইম্পোর্ট
import Courses from './pages/Courses';
import Payment from './pages/Payment';
import MyCourses from './pages/MyCourses';
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <Router>
      {/* Flexbox ব্যবহার করা হয়েছে যাতে কন্টেন্ট কম থাকলেও 
        ফুটার সবসময় স্ক্রিনের নিচে (Sticky Footer) থাকে।
      */}
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Navbar: সব পেজেই দেখা যাবে */}
        <Navbar />
        
        {/* Main Content: flex: 1 দেওয়া হয়েছে ফুটারকে নিচে পুশ করার জন্য */}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* ১. সাধারণ পেজসমূহ */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} /> 
            <Route path="/guideline" element={<Guideline />} />

            {/* ২. অথেন্টিকেশন (Login/Register) */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* ৩. ইউজার প্রোফাইল ও লার্নিং */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/payment" element={<Payment />} />

            {/* ৪. এডমিন প্যানেল ফিচারসমূহ */}
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/manage-courses" element={<ManageCourses />} /> {/* নতুন রাউট */}
          </Routes>
        </div>

        {/* Footer: সব পেজের শেষে দেখা যাবে */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components & Pages Import
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // ১. ফুটার ইম্পোর্ট করা হলো
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Guideline from './pages/Guideline';
import AddCourse from './pages/AddCourse';

function App() {
  return (
    <Router>
      {/* নিচের স্টাইলটি দেওয়া হয়েছে যাতে ফুটার সবসময় পেজের নিচে থাকে। 
          পেজে কন্টেন্ট কম থাকলেও ফুটার নিচে "Sticky" হয়ে থাকবে।
      */}
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* Navbar সব পেজেই দেখা যাবে */}
        <Navbar />
        
        {/* মেইন কন্টেন্ট এলাকা (flex: 1 দেওয়া হয়েছে ফুটারকে নিচে পুশ করার জন্য) */}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* ১. হোম পেজ */}
            <Route path="/" element={<Home />} />

            {/* ২. রেজিস্ট্রেশন পেজ */}
            <Route path="/register" element={<Register />} />

            {/* ৩. লগইন পেজ */}
            <Route path="/login" element={<Login />} />

            {/* ৪. ড্যাশবোর্ড পেজ */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* ৫. গাইডলাইন পেজ */}
            <Route path="/guideline" element={<Guideline />} />

            {/* ৬. অ্যাড কোর্স পেজ */}
            <Route path="/add-course" element={<AddCourse />} />
          </Routes>
        </div>

        {/* Footer সব পেজের নিচেই দেখা যাবে */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
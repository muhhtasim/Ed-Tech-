import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components & Pages Import
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Dashboard page import
// import Guideline from './pages/Guideline'; // পরে Guideline বানালে এটি আনকমেন্ট করবেন

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar সব পেজেই দেখা যাবে */}
        <Navbar />
        
        <Routes>
          {/* ১. হোম পেজ (Search & Filter সহ) */}
          <Route path="/" element={<Home />} />

          {/* ২. রেজিস্ট্রেশন পেজ (Create User) */}
          <Route path="/register" element={<Register />} />

          {/* ৩. লগইন পেজ (Read/Auth User) */}
          <Route path="/login" element={<Login />} />

          {/* ৪. ড্যাশবোর্ড পেজ (Update User Info) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ৫. গাইডলাইন পেজ (আপনার স্কেচ অনুযায়ী) */}
          {/* <Route path="/guideline" element={<Guideline />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
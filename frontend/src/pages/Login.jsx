import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert("Login Success!");
      window.location.href = '/'; 
    } catch (err) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div style={authWrapper}>
      <div style={authCard}>
        <div style={iconCircle}>
          <LogIn size={32} color="#fff" />
        </div>
        
        <h2 style={authTitle}>Welcome <span style={gradientText}>Back!</span></h2>
        <p style={authSubTitle}>Log in to continue your learning journey.</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroup}>
            <Mail size={18} color="#9CA3AF" style={inputIcon} />
            <input 
              type="email" 
              placeholder="Email Address" 
              style={inputStyle} // এখানে টেক্সট কালার ঠিক করা হয়েছে
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div style={inputGroup}>
            <Lock size={18} color="#9CA3AF" style={inputIcon} />
            <input 
              type="password" 
              placeholder="Password" 
              style={inputStyle} // এখানে টেক্সt কালার ঠিক করা হয়েছে
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" style={authBtn}>
            Login Now <ArrowRight size={18} />
          </button>
        </form>

        <p style={toggleText}>
          Don't have an account? <Link to="/register" style={linkStyle}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

// --- Styles (পরিবর্তন শুধুমাত্র inputStyle এ) ---
const authWrapper = {
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  minHeight: '90vh', background: 'radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, #F3F4F6 100%)'
};

const authCard = {
  background: '#fff', padding: '50px 40px', borderRadius: '24px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '420px', textAlign: 'center'
};

const iconCircle = {
  width: '70px', height: '70px', background: 'linear-gradient(135deg, #4F46E5 0%, #10B981 100%)',
  borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto',
  boxShadow: '0 10px 15px rgba(79, 70, 229, 0.3)'
};

const authTitle = { fontSize: '32px', fontWeight: '800', color: '#111827', margin: '0 0 10px 0' };
const gradientText = { background: 'linear-gradient(90deg, #4F46E5, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const authSubTitle = { color: '#6B7280', marginBottom: '30px', fontSize: '15px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputGroup = { position: 'relative', display: 'flex', alignItems: 'center' };
const inputIcon = { position: 'absolute', left: '15px' };

// এখানে কালার পরিবর্তন করা হয়েছে
const inputStyle = { 
  width: '100%', 
  padding: '15px 15px 15px 45px', 
  borderRadius: '12px', 
  border: '1px solid #E5E7EB', 
  outline: 'none', 
  fontSize: '15px', 
  background: '#FFFFFF', // ব্যাকগ্রাউন্ড পিওর হোয়াইট
  color: '#1F2937',      // ইনপুটে টাইপ করার সময় লেখা গাঢ় ধূসর/কালো দেখাবে
  transition: '0.3s' 
};

const authBtn = { padding: '15px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)', transition: '0.3s' };
const toggleText = { marginTop: '25px', color: '#6B7280', fontSize: '14px' };
const linkStyle = { color: '#4F46E5', fontWeight: 'bold', textDecoration: 'none' };

export default Login;
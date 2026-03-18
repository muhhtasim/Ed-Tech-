import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      
      // ১. ডাটাবেজ থেকে আসা ইউজার অবজেক্টটি (নাম, ইমেইল, রোল সহ) সেভ করা
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      alert(`Login Successful! Welcome ${res.data.user.name}`);

      // ২. রোল অনুযায়ী রিডাইরেক্ট (৫ বছরের অভিজ্ঞতায় এটিই সেরা প্র্যাকটিস)
      if (res.data.user.role === 'admin') {
        navigate('/'); // এডমিন সরাসরি হোম পেজে যাবে কোর্স অ্যাড/ডিলিট করার জন্য
      } else {
        navigate('/dashboard'); // স্টুডেন্ট তার ড্যাশবোর্ডে যাবে
      }

      // নেভবার আপডেট করার জন্য পেজ রিফ্রেশ (অথবা স্টেট ম্যানেজমেন্ট ব্যবহার করা যায়)
      window.location.reload(); 

    } catch (err) {
      alert("Invalid Credentials! Please check your email/password.");
      console.error(err);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
          <div style={iconCircle}>
            <LockKeyhole color="#4F46E5" size={28} />
          </div>
        </div>
        
        <h2 style={{ color: '#1F2937', marginBottom: '10px' }}>Welcome Back</h2>
        <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '25px' }}>Please enter your details to login</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <button type="submit" style={btnStyle}>Sign In</button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '14px', color: '#6B7280' }}>
          Don't have an account? <Link to="/register" style={{ color: '#4F46E5', fontWeight: 'bold', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '85vh',
  background: '#F9FAFB' 
};

const cardStyle = {
  background: '#fff',
  padding: '40px',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  border: '1px solid #E5E7EB'
};

const iconCircle = {
  background: '#EEF2FF',
  padding: '15px',
  borderRadius: '50%',
  display: 'inline-block'
};

const inputStyle = {
  padding: '12px 15px',
  borderRadius: '10px',
  border: '1px solid #D1D5DB',
  outline: 'none',
  fontSize: '15px',
  transition: '0.2s'
};

const btnStyle = {
  padding: '12px',
  background: '#4F46E5',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '10px',
  transition: '0.3s'
};

export default Login;
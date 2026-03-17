import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      // Local storage এ ইউজার ডাটা সেভ করা
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert("Login Successful! Welcome " + res.data.user.name);
      navigate('/dashboard'); // লগইন হলে ড্যাশবোর্ডে নিয়ে যাবে
    } catch (err) {
      alert("Invalid Credentials! Please check your email/password.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#1F2937', marginBottom: '20px' }}>Login to Ed-Tech</h2>
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
          <button type="submit" style={btnStyle}>Login</button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#6B7280' }}>
          Don't have an account? <a href="/register" style={{ color: '#4F46E5' }}>Register here</a>
        </p>
      </div>
    </div>
  );
};

// Styles (প্রফেশনাল লুকের জন্য)
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
  background: '#F3F4F6' // হালকা গ্রে ব্যাকগ্রাউন্ড, যাতে ব্লু স্ক্রিন না আসে
};

const cardStyle = {
  background: '#fff',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center'
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #D1D5DB',
  outline: 'none',
  fontSize: '16px'
};

const btnStyle = {
  padding: '12px',
  background: '#4F46E5',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold'
};

export default Login;
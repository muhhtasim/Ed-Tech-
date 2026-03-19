import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [university, setUniversity] = useState(''); // নতুন স্টেট
  const [role, setRole] = useState('student'); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // আমরা এখন university সহ ডাটা পাঠাচ্ছি
      const res = await axios.post('http://localhost:5000/register', { 
        name, 
        email, 
        password, 
        role,
        university // ব্যাকএন্ডে এটি পাঠানো হচ্ছে
      });

      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert("Registration Failed! " + (err.response?.data?.error || "Check your details."));
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
        
        <form onSubmit={handleRegister} style={formStyle}>
          <input 
            type="text" 
            placeholder="Full Name" 
            style={inputStyle}
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {/* নতুন ইউনিভার্সিটি ইনপুট ফিল্ড */}
          <input 
            type="text" 
            placeholder="University Name" 
            style={inputStyle}
            onChange={(e) => setUniversity(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '14px', color: '#666' }}>Register as:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              style={inputStyle}
            >
              <option value="student">Student</option>
              <option value="admin">Teacher/Admin</option>
            </select>
          </div>

          <button type="submit" style={btnStyle}>Register</button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have an account? <Link to="/login" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

// --- Styles (আগের মতোই) ---
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#F3F4F6', padding: '20px' };
const cardStyle = { background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' };
const btnStyle = { padding: '12px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' };

export default Register;
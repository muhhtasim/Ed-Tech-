import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
  // ১. স্টেট-এ 'role' এবং আপনার আগের 'university' কলামগুলো রাখা হয়েছে
  const [formData, setFormData] = useState({ 
    full_name: '', 
    email: '', 
    password: '', 
    university: '',
    role: 'student' // ডিফল্ট রোল স্টুডেন্ট রাখা হয়েছে
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ব্যাকএন্ডে পুরো formData পাঠানো হচ্ছে (role সহ)
      await axios.post('http://localhost:5000/register', formData);
      alert("Registration Successful! Now Login.");
      navigate('/login');
    } catch (err) {
      alert("Registration failed. Email might already exist or Server Error.");
      console.error(err);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <UserPlus color="#4F46E5" size={24} />
          <h2 style={{ margin: 0 }}>Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <label style={labelStyle}>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
            required 
            style={inputStyle} 
          />

          <label style={labelStyle}>Email Address</label>
          <input 
            type="email" 
            placeholder="example@mail.com" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
            style={inputStyle} 
          />

          <label style={labelStyle}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
            style={inputStyle} 
          />

          <label style={labelStyle}>University / Institute</label>
          <input 
            type="text" 
            placeholder="Your University Name" 
            onChange={(e) => setFormData({...formData, university: e.target.value})} 
            style={inputStyle} 
          />

          {/* ২. নতুন রোল সিলেকশন ড্রপডাউন */}
          <label style={labelStyle}>Register as a:</label>
          <select 
            style={inputStyle} 
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          >
            <option value="student">Student (I want to learn)</option>
            <option value="admin">Teacher / Admin (I want to teach)</option>
          </select>

          <button type="submit" style={btnStyle}>Create Account</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#666' }}>
          Already have an account? <span onClick={() => navigate('/login')} style={{ color: '#4F46E5', cursor: 'pointer', fontWeight: '600' }}>Login</span>
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
  minHeight: '85vh',
  background: '#f9fafb',
  padding: '20px'
};

const cardStyle = {
  width: '100%',
  maxWidth: '450px',
  padding: '40px',
  background: '#fff',
  borderRadius: '15px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  border: '1px solid #e5e7eb'
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '-10px' // ইনপুটের সাথে গ্যাপ কমানোর জন্য
};

const inputStyle = { 
  padding: '12px', 
  borderRadius: '8px', 
  border: '1px solid #d1d5db',
  fontSize: '15px',
  outline: 'none'
};

const btnStyle = { 
  padding: '12px', 
  background: '#4F46E5', 
  color: 'white', 
  border: 'none', 
  borderRadius: '8px', 
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '16px',
  marginTop: '10px',
  transition: '0.3s'
};

export default Register;
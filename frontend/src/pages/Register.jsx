import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', password: '', university: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData);
      alert("Registration Successful! Now Login.");
      navigate('/login');
    } catch (err) {
      alert("Registration failed. Email might already exist.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, full_name: e.target.value})} required style={inputStyle} />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required style={inputStyle} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required style={inputStyle} />
        <input type="text" placeholder="University" onChange={(e) => setFormData({...formData, university: e.target.value})} style={inputStyle} />
        <button type="submit" style={btnStyle}>Register</button>
      </form>
    </div>
  );
};

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Register;
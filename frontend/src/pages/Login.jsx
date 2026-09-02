import React, { useState } from 'react';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { addToast } = useToast();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res.data.token) {
        // store token in memory only
        const auth = await import('../utils/auth');
        auth.default.setToken(res.data.token);
      }
      // refreshToken is now stored in httpOnly cookie by the server
      // `api` is configured with `withCredentials: true`
        addToast('Login successful!', { type: 'success' });
        navigate('/');
    } catch (error) {
      console.error(error);
        addToast('Invalid credentials!', { type: 'error' });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={iconCircle}>
          <LogIn size={32} color="var(--bg)" />
        </div>
        
        <h2 style={authTitle}>Welcome <span style={gradientText}>Back!</span></h2>
        <p style={authSubTitle}>Log in to continue your learning journey.</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <div style={inputGroup}>
            <Mail size={18} color="var(--muted-2)" style={inputIcon} />
            <input 
              type="email" 
              placeholder="Email Address" 
              style={inputStyle} // এখানে টেক্সট কালার ঠিক করা হয়েছে
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div style={inputGroup}>
            <Lock size={18} color="var(--muted-2)" style={inputIcon} />
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

// --- Styles (partial; layout classes defined in CSS) ---

const iconCircle = {
  width: '70px', height: '70px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--success) 100%)',
  borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto',
  boxShadow: '0 10px 15px rgba(79, 70, 229, 0.3)'
};

const authTitle = { fontSize: '32px', fontWeight: '800', color: 'var(--text-dark)', margin: '0 0 10px 0' };
const gradientText = { background: 'linear-gradient(90deg, var(--primary), var(--success))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const authSubTitle = { color: 'var(--muted)', marginBottom: '30px', fontSize: '15px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputGroup = { position: 'relative', display: 'flex', alignItems: 'center' };
const inputIcon = { position: 'absolute', left: '15px' };

// এখানে কালার পরিবর্তন করা হয়েছে
const inputStyle = { 
  width: '100%', 
  padding: '15px 15px 15px 45px', 
  borderRadius: '12px', 
  border: '1px solid var(--border)', 
  outline: 'none', 
  fontSize: '15px', 
  background: 'var(--bg)', // ব্যাকগ্রাউন্ড পিওর হোয়াইট
  color: 'var(--text-dark)',      // ইনপুটে টাইপ করার সময় লেখা গাঢ় ধূসর/কালো দেখাবে
  transition: '0.3s' 
};

const authBtn = { padding: '15px', background: 'var(--primary)', color: 'var(--bg)', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)', transition: '0.3s' };
const toggleText = { marginTop: '25px', color: 'var(--muted)', fontSize: '14px' };
const linkStyle = { color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' };

export default Login;
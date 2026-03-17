import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 5%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BookOpen color="#4F46E5" />
        <h2 style={{ margin: 0 }}>Ed-Tech</h2>
      </div>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', alignItems: 'center' }}>
        <li><Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link></li>
        <li><Link to="/guideline" style={{ textDecoration: 'none', color: '#333' }}>Guideline</Link></li>
        <li><Link to="/courses" style={{ textDecoration: 'none', color: '#333' }}>Courses</Link></li>
        <li><Link to="/login"><button style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', background: '#4F46E5', color: '#fff', cursor: 'pointer' }}>Login</button></Link></li>
      </ul>
    </nav>
  );
};

// Navbar.jsx er bhetor check korun user ache kina
const user = JSON.parse(localStorage.getItem('user'));

// Login button er jaygay nichei code tuku likhun
{user ? (
  <Link to="/dashboard" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Hi, {user.name}</Link>
) : (
  <Link to="/login"><button>Login</button></Link>
)}

export default Navbar;
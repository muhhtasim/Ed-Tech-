import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { BookOpen, User, LogOut, PlusCircle, BookMarked, Settings, Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
      credentials: 'include'
    }).catch(() => {});
    localStorage.removeItem('user');
    // clear in-memory token
    import('../utils/auth').then(a => a.default.clearToken()).catch(() => {});
    addToast('Logged out successfully!', { type: 'info' });
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      {/* Logo Section */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
        <div style={logoBadge}>
           <BookOpen color="var(--bg)" size={20} />
        </div>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>Ed-Tech</h2>
      </Link>

      <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu Links */}
      <ul style={ulStyle} className={`nav-links ${open ? 'open' : ''}`}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/guideline" style={linkStyle}>Guideline</Link></li>
        
        {/* ইউজার লগইন থাকলে এবং সে স্টুডেন্ট হলে 'My Courses' দেখাবে */}
        {user && user.role === 'student' && (
          <li>
            <Link to="/my-courses" style={myCoursesLinkStyle} onClick={() => setOpen(false)}>
              <BookMarked size={18} /> My Courses
            </Link>
          </li>
        )}

        {/* ইউজার লগইন থাকলে অপশনগুলো দেখাবে */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            
            {/* 🔥 শুধুমাত্র Admin হলে 'Add Course' এবং 'Manage Courses' দেখাবে */}
            {user.role === 'admin' && (
              <>
                <li>
                  <Link to="/add-course" style={adminLinkStyle} onClick={() => setOpen(false)}>
                    <PlusCircle size={18} /> Add Course
                  </Link>
                </li>
                <li>
                  <Link to="/manage-courses" style={adminLinkStyle} onClick={() => setOpen(false)}>
                    <Settings size={18} /> Manage
                  </Link>
                </li>
              </>
            )}

            {/* ইউজার প্রোফাইল লিঙ্ক */}
            <Link to="/dashboard" style={dashboardLinkStyle} onClick={() => setOpen(false)}>
              <User size={18} /> {user.name}
            </Link>
            
            {/* লগআউট বাটন */}
            <button onClick={() => { setOpen(false); handleLogout(); }} style={logoutBtnStyle} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <>
            <li><Link to="/courses" style={linkStyle} onClick={() => setOpen(false)}>Courses</Link></li>
            <li>
              <Link to="/login">
                <button style={loginBtnStyle}>Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// --- Styles ---
const navStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '1rem 8%', background: 'var(--bg)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  position: 'sticky', top: 0, zIndex: 1000
};

const logoBadge = {
  background: 'var(--primary)', padding: '8px', borderRadius: '10px',
  display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const ulStyle = {
  display: 'flex', gap: '20px', listStyle: 'none',
  alignItems: 'center', margin: 0, padding: 0
};

const linkStyle = {
  textDecoration: 'none', color: 'var(--muted-2)', fontWeight: '500', fontSize: '15px', transition: '0.3s'
};

const myCoursesLinkStyle = {
  textDecoration: 'none', color: 'var(--primary)', fontWeight: '600',
  fontSize: '15px', display: 'flex', alignItems: 'center', gap: '5px'
};

// এডমিন লিঙ্কের জন্য কমন স্টাইল
const adminLinkStyle = {
  textDecoration: 'none', color: 'var(--primary)', fontWeight: '600',
  fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px',
  border: '1px solid var(--primary-50)', padding: '6px 12px', borderRadius: '20px',
  background: 'var(--surface)', transition: '0.3s'
};

const loginBtnStyle = {
  padding: '8px 24px', borderRadius: '25px', border: 'none',
  background: 'var(--primary)', color: 'var(--bg)', cursor: 'pointer',
  fontWeight: '600', transition: '0.3s', boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)'
};

const dashboardLinkStyle = {
  textDecoration: 'none', color: 'var(--primary)', fontWeight: 'bold',
  fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px',
  background: 'var(--primary-50)', padding: '6px 15px', borderRadius: '12px'
};

const logoutBtnStyle = {
  background: 'var(--danger-50)', border: 'none', color: 'var(--danger)',
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  padding: '8px', borderRadius: '10px', transition: '0.3s'
};

export default Navbar;
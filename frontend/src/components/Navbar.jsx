import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, PlusCircle } from 'lucide-react';

const Navbar = () => {
  // ১. ইউজার লগইন করা আছে কি না চেক করা
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // ২. লগআউট ফাংশন
  const handleLogout = () => {
    localStorage.removeItem('user');
    alert("Logged out successfully!");
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      {/* Logo Section */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
        <BookOpen color="#4F46E5" />
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>Ed-Tech</h2>
      </Link>

      {/* Menu Links */}
      <ul style={ulStyle}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/guideline" style={linkStyle}>Guideline</Link></li>
        <li><Link to="/courses" style={linkStyle}>Courses</Link></li>

        {/* ৩. ইউজার লগইন থাকলে 'Add Course' এবং প্রোফাইল দেখাবে */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Add Course Link - লগইন থাকলেই শুধু দেখা যাবে */}
            <li>
              <Link to="/add-course" style={addCourseLinkStyle}>
                <PlusCircle size={18} /> Add Course
              </Link>
            </li>

            <Link to="/dashboard" style={dashboardLinkStyle}>
              <User size={18} /> Hi, {user.name}
            </Link>
            
            <button onClick={handleLogout} style={logoutBtnStyle} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <li>
            <Link to="/login">
              <button style={loginBtnStyle}>Login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

// --- Styles ---
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 8%',
  background: '#fff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const ulStyle = {
  display: 'flex',
  gap: '25px',
  listStyle: 'none',
  alignItems: 'center',
  margin: 0,
  padding: 0
};

const linkStyle = {
  textDecoration: 'none',
  color: '#4B5563',
  fontWeight: '500',
  fontSize: '15px'
};

// Add Course বাটন স্টাইল
const addCourseLinkStyle = {
  textDecoration: 'none',
  color: '#4F46E5',
  fontWeight: '600',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  border: '1px solid #4F46E5',
  padding: '6px 15px',
  borderRadius: '20px',
  transition: '0.3s'
};

const loginBtnStyle = {
  padding: '8px 24px',
  borderRadius: '25px',
  border: 'none',
  background: '#4F46E5',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: '600',
  transition: '0.3s'
};

const dashboardLinkStyle = {
  textDecoration: 'none',
  color: '#4F46E5',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  background: '#EEF2FF',
  padding: '6px 12px',
  borderRadius: '10px'
};

const logoutBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#EF4444',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center'
};

export default Navbar;
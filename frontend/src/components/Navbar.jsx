import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, PlusCircle, BookMarked, Settings } from 'lucide-react'; 

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert("Logged out successfully!");
    window.location.href = '/login'; 
  };

  return (
    <nav style={navStyle}>
      {/* Logo Section */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
        <div style={logoBadge}>
           <BookOpen color="#fff" size={20} />
        </div>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>Ed-Tech</h2>
      </Link>

      {/* Menu Links */}
      <ul style={ulStyle}>
        <li><Link to="/" style={linkStyle}>Home</Link></li>
        <li><Link to="/guideline" style={linkStyle}>Guideline</Link></li>
        
        {/* ইউজার লগইন থাকলে এবং সে স্টুডেন্ট হলে 'My Courses' দেখাবে */}
        {user && user.role === 'student' && (
          <li>
            <Link to="/my-courses" style={myCoursesLinkStyle}>
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
                  <Link to="/add-course" style={adminLinkStyle}>
                    <PlusCircle size={18} /> Add Course
                  </Link>
                </li>
                <li>
                  <Link to="/manage-courses" style={adminLinkStyle}>
                    <Settings size={18} /> Manage
                  </Link>
                </li>
              </>
            )}

            {/* ইউজার প্রোফাইল লিঙ্ক */}
            <Link to="/dashboard" style={dashboardLinkStyle}>
              <User size={18} /> {user.name}
            </Link>
            
            {/* লগআউট বাটন */}
            <button onClick={handleLogout} style={logoutBtnStyle} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <>
            <li><Link to="/courses" style={linkStyle}>Courses</Link></li>
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
  padding: '1rem 8%', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  position: 'sticky', top: 0, zIndex: 1000
};

const logoBadge = {
  background: '#4F46E5', padding: '8px', borderRadius: '10px',
  display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const ulStyle = {
  display: 'flex', gap: '20px', listStyle: 'none',
  alignItems: 'center', margin: 0, padding: 0
};

const linkStyle = {
  textDecoration: 'none', color: '#4B5563', fontWeight: '500', fontSize: '15px', transition: '0.3s'
};

const myCoursesLinkStyle = {
  textDecoration: 'none', color: '#4F46E5', fontWeight: '600',
  fontSize: '15px', display: 'flex', alignItems: 'center', gap: '5px'
};

// এডমিন লিঙ্কের জন্য কমন স্টাইল
const adminLinkStyle = {
  textDecoration: 'none', color: '#4F46E5', fontWeight: '600',
  fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px',
  border: '1px solid #E0E7FF', padding: '6px 12px', borderRadius: '20px',
  background: '#F9FAFB', transition: '0.3s'
};

const loginBtnStyle = {
  padding: '8px 24px', borderRadius: '25px', border: 'none',
  background: '#4F46E5', color: '#fff', cursor: 'pointer',
  fontWeight: '600', transition: '0.3s', boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)'
};

const dashboardLinkStyle = {
  textDecoration: 'none', color: '#4F46E5', fontWeight: 'bold',
  fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px',
  background: '#EEF2FF', padding: '6px 15px', borderRadius: '12px'
};

const logoutBtnStyle = {
  background: '#FEE2E2', border: 'none', color: '#EF4444',
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  padding: '8px', borderRadius: '10px', transition: '0.3s'
};

export default Navbar;
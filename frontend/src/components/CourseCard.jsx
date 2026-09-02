import React from 'react';
import api from '../utils/api';
import { Trash2, ShoppingCart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const CourseCard = ({ course, onRefresh }) => {
  // localStorage থেকে ইউজার ডাটা নেওয়া
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleDelete = async (e) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/delete-course/${course.course_id}`);
        addToast('Course deleted', { type: 'success' });
        onRefresh();
      } catch (error) {
        console.error(error);
        addToast('Failed to delete the course', { type: 'error' });
      }
    }
  };

  // ৩. Buy Now বাটনের জন্য আপডেট করা ফাংশন
  const handleBuyNow = () => {
    if (!user) {
      addToast('Please login first to buy this course!', { type: 'warning' });
      navigate('/login');
      return;
    }

    // পেমেন্ট পেজে ডাটা পাঠানো হচ্ছে (সবগুলো প্রয়োজনীয় তথ্যসহ)
    navigate('/payment', { 
      state: { 
        courseId: course.course_id, // 🔥 এটিই মিসিং ছিল!
        courseTitle: course.title, 
        price: course.price 
      } 
    });
  };

  return (
    <div style={cardStyle} role="article" aria-label={`Course ${course.title}`}>
      {/* টাইটেল এবং ইমেজ (যদি থাকে) লিঙ্কে রূপান্তর */}
      <Link to={`/course/${course.course_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3 style={titleStyle}>{course.title}</h3>
      </Link>
      
      <p style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '10px' }}>{course.price} BDT</p>
      
      <Link to={`/course/${course.course_id}`} style={viewLinkStyle}>
        <Eye size={14} /> View Details
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        
        {/* কন্ডিশন ১: Admin ডিলিট বাটন দেখবে */}
        {user && user.role === 'admin' && (
          <button 
              onClick={handleDelete}
              aria-label={`Delete ${course.title}`}
              style={{ background: 'var(--danger)', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <Trash2 size={16} /> Delete
            </button>
        )}

        {/* কন্ডিশন ২: Student বা গেস্ট Buy Now বাটন দেখবে */}
        {(!user || user.role === 'student') && (
          <button 
            onClick={handleBuyNow} 
            aria-label={`Buy ${course.title}`}
            style={{ background: 'var(--success)', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <ShoppingCart size={18} /> Buy Now
          </button>
        )}

      </div>
    </div>
  );
};

// --- Styles ---
const cardStyle = {
  border: '1px solid var(--border)',
  padding: '20px',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '260px',
  background: 'var(--bg)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s',
  cursor: 'pointer'
};

const titleStyle = {
  margin: '0 0 10px 0',
  fontSize: '18px',
  color: 'var(--text-dark)',
  height: '50px',
  overflow: 'hidden'
};


const viewLinkStyle = {
  fontSize: '13px',
  color: 'var(--primary)',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
};

export default CourseCard;
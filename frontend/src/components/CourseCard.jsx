import React from 'react';
import axios from 'axios';
import { Trash2, ShoppingCart, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onRefresh }) => {
  // localStorage থেকে ইউজার ডাটা নেওয়া
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation(); 
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-course/${course.course_id}`);
        alert("Course Deleted!");
        onRefresh();
      } catch (err) {
        alert("Failed to delete the course.");
      }
    }
  };

  // ৩. Buy Now বাটনের জন্য আপডেট করা ফাংশন
  const handleBuyNow = () => {
    if (!user) {
      alert("Please login first to buy this course!");
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
    <div style={cardStyle}>
      {/* টাইটেল এবং ইমেজ (যদি থাকে) লিঙ্কে রূপান্তর */}
      <Link to={`/course/${course.course_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h3 style={titleStyle}>{course.title}</h3>
      </Link>
      
      <p style={{ fontWeight: 'bold', color: '#4F46E5', marginBottom: '10px' }}>{course.price} BDT</p>
      
      <Link to={`/course/${course.course_id}`} style={viewLinkStyle}>
        <Eye size={14} /> View Details
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        
        {/* কন্ডিশন ১: Admin ডিলিট বাটন দেখবে */}
        {user && user.role === 'admin' && (
          <button 
            onClick={handleDelete}
            style={{ background: '#EF4444', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <Trash2 size={16} /> Delete
          </button>
        )}

        {/* কন্ডিশন ২: Student বা গেস্ট Buy Now বাটন দেখবে */}
        {(!user || user.role === 'student') && (
          <button 
            onClick={handleBuyNow} 
            style={{ background: '#10B981', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
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
  border: '1px solid #e5e7eb',
  padding: '20px',
  borderRadius: '12px',
  width: '260px',
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s',
  cursor: 'pointer'
};

const titleStyle = {
  margin: '0 0 10px 0',
  fontSize: '18px',
  color: '#1F2937',
  height: '50px',
  overflow: 'hidden'
};


const viewLinkStyle = {
  fontSize: '13px',
  color: '#4F46E5',
  textDecoration: 'none',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
};

export default CourseCard;
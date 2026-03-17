import React from 'react';
import axios from 'axios';
import { Trash2, Eye } from 'lucide-react';

const CourseCard = ({ course, onRefresh }) => {
  
  const handleDelete = async () => {
  // console.log check korar jonno (F12 te dekhben id asche kina)
  console.log("Deleting Course ID:", course.course_id || course.id);

  if (window.confirm(`Are you sure you want to delete this course?`)) {
    try {
      // ekhne course.course_id thik moto na pele course.id check korbe
      const idToDelete = course.course_id || course.id; 
      
      const response = await axios.delete(`http://localhost:5000/delete-course/${idToDelete}`);
      
      alert("Deleted Successfully!");
      onRefresh();
    } catch (err) {
      alert("Failed to delete: Server Error");
      console.error(err);
    }
  }
};

  return (
    <div style={cardStyle}>
      <div style={badgeStyle}>{course.category || 'Course'}</div>
      <h3 style={titleStyle}>{course.title}</h3>
      <p style={priceStyle}>{course.price} BDT</p>
      
      <div style={actionContainer}>
        <button style={viewBtnStyle}>
          <Eye size={16} /> View
        </button>
        
        <button 
          onClick={handleDelete}
          style={deleteBtnStyle}
          title="Delete Course"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// --- Styles (৫ বছরের অভিজ্ঞতায় ক্লিন লুকের জন্য) ---
const cardStyle = {
  border: '1px solid #e2e8f0',
  padding: '20px',
  borderRadius: '15px',
  width: '260px',
  background: '#fff',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s'
};

const titleStyle = { margin: '10px 0', fontSize: '18px', color: '#1e293b', height: '50px', overflow: 'hidden' };
const priceStyle = { fontWeight: 'bold', color: '#4F46E5', fontSize: '20px' };
const badgeStyle = { fontSize: '10px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '5px', display: 'inline-block' };

const actionContainer = { display: 'flex', justifyContent: 'space-between', marginTop: '15px', gap: '10px' };

const viewBtnStyle = { 
  flex: 1, background: '#4F46E5', color: 'white', padding: '8px', 
  border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' 
};

const deleteBtnStyle = { 
  background: '#fee2e2', color: '#ef4444', padding: '8px 12px', 
  border: 'none', borderRadius: '8px', cursor: 'pointer' 
};

export default CourseCard;
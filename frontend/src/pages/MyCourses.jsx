import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, PlayCircle, Loader2 } from 'lucide-react';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/my-courses/${user.id || user.user_id}`);
        setEnrolledCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyCourses();
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: '100px', color: '#4F46E5' }}>
      <Loader2 className="animate-spin" size={40} />
      <p>Loading your learning journey...</p>
    </div>
  );

  return (
    <div style={{ padding: '60px 8%', minHeight: '80vh', background: '#F9FAFB' }}>
      {/* হেডার সেকশন */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={sectionTitleGradient}>
          <BookOpen size={36} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
          My Enrolled Courses
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px', marginTop: '10px' }}>
          Welcome back! Continue where you left off.
        </p>
      </div>

      {enrolledCourses.length > 0 ? (
        <div style={gridStyle}>
          {enrolledCourses.map((course) => (
            <div key={course.course_id} style={enrolledCardStyle}>
              <div style={badgeStyle}>{course.category}</div>
              <h3 style={courseTitleStyle}>{course.title}</h3>
              <div style={progressBarContainer}>
                <div style={progressBar}></div>
              </div>
              <p style={{ color: '#6B7280', fontSize: '13px', marginBottom: '20px' }}>
                Progress: <span style={{ color: '#4F46E5', fontWeight: 'bold' }}>0% Completed</span>
              </p>
              <button style={startBtnStyle}>
                <PlayCircle size={18} /> Start Learning
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h3 style={{ color: '#9CA3AF' }}>You haven't enrolled in any courses yet.</h3>
          <button 
            onClick={() => window.location.href = '/'} 
            style={browseBtnStyle}
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const sectionTitleGradient = {
  fontSize: '40px',
  fontWeight: '900',
  background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
};

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' };

const enrolledCardStyle = { 
  background: '#fff', 
  padding: '30px', 
  borderRadius: '20px', 
  border: '1px solid #E5E7EB', 
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
  position: 'relative',
  transition: 'transform 0.3s ease'
};

const badgeStyle = { 
  background: '#EEF2FF', 
  color: '#4F46E5', 
  padding: '5px 12px', 
  borderRadius: '20px', 
  fontSize: '12px', 
  fontWeight: 'bold',
  marginBottom: '15px',
  display: 'inline-block'
};

const courseTitleStyle = { fontSize: '22px', fontWeight: '800', color: '#1F2937', marginBottom: '15px', height: '60px', overflow: 'hidden' };

const progressBarContainer = { width: '100%', height: '8px', background: '#F3F4F6', borderRadius: '10px', marginBottom: '10px' };
const progressBar = { width: '10%', height: '100%', background: 'linear-gradient(90deg, #4F46E5, #10B981)', borderRadius: '10px' };

const startBtnStyle = { 
  width: '100%', padding: '14px', 
  background: '#4F46E5', color: '#fff', 
  border: 'none', borderRadius: '12px', 
  fontWeight: 'bold', cursor: 'pointer', 
  display: 'flex', justifyContent: 'center', 
  alignItems: 'center', gap: '8px', 
  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
};

const browseBtnStyle = { marginTop: '20px', padding: '12px 25px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' };

export default MyCourses;
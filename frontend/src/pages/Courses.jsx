import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';
import { BookOpen, AlertCircle } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get('/courses');
      setCourses(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Could not load courses. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={iconBox}>
          <BookOpen size={30} color="var(--bg)" />
        </div>
        <h1 style={{ margin: '10px 0' }}>All Available Courses</h1>
        <p style={{ color: 'var(--muted)' }}>Browse our complete catalog of professional programs.</p>
      </div>

      {/* লোডিং অবস্থা */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div className="spinner" style={spinnerStyle}></div>
          <p>Loading Awesome Courses...</p>
        </div>
      )}

      {/* এরর মেসেজ (সার্ভার বন্ধ থাকলে এটি দেখাবে) */}
      {error && (
        <div style={errorCard}>
          <AlertCircle size={40} color="var(--danger)" />
          <p>{error}</p>
          <button onClick={fetchCourses} style={retryBtn}>Retry</button>
        </div>
      )}

      {/* কোর্স লিস্ট গ্রিড */}
      {!loading && !error && (
        <div style={gridStyle}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard 
                key={course.course_id} 
                course={course} 
                onRefresh={fetchCourses} 
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', color: 'var(--muted-2)' }}>
              No courses found in the database.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const containerStyle = { padding: '50px 8%', background: 'var(--surface)', minHeight: '100vh' };
const headerStyle = { textAlign: 'center', marginBottom: '50px' };
const iconBox = { background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' };

const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
  gap: '20px', 
  justifyItems: 'center' 
};

const errorCard = { textAlign: 'center', padding: '40px', background: '#FEF2F2', borderRadius: '12px', border: '1px solid var(--danger-50)', maxWidth: '400px', margin: '0 auto' };
const retryBtn = { marginTop: '15px', padding: '8px 20px', background: 'var(--primary)', color: 'var(--bg)', border: 'none', borderRadius: '5px', cursor: 'pointer' };

const spinnerStyle = { 
  width: '40px', 
  height: '40px', 
  border: '4px solid var(--surface)', 
  borderTop: '4px solid var(--primary)',
  borderRadius: '50%', 
  margin: '0 auto 10px',
  animation: 'spin 1s linear infinite' 
};

export default Courses;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, BookOpen, RefreshCw } from 'lucide-react';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-course/${id}`);
        alert("Course Deleted!");
        fetchCourses(); // লিস্ট রিফ্রেশ করা
      } catch (err) {
        alert("Failed to delete!");
      }
    }
  };

  return (
    <div style={{ padding: '40px 8%', background: '#F9FAFB', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2><BookOpen size={28} style={{ verticalAlign: 'middle' }} /> Manage All Courses</h2>
        <button onClick={fetchCourses} style={refreshBtn}><RefreshCw size={18} /> Refresh</button>
      </div>

      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead>
            <tr style={headerRow}>
              <th style={th}>ID</th>
              <th style={th}>Course Title</th>
              <th style={th}>Category</th>
              <th style={th}>Price</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_id} style={trStyle}>
                <td style={td}>{course.course_id}</td>
                <td style={{ ...td, fontWeight: 'bold' }}>{course.title}</td>
                <td style={td}>{course.category}</td>
                <td style={td}>৳ {course.price}</td>
                <td style={td}>
                  <button onClick={() => deleteCourse(course.course_id)} style={deleteBtn}>
                    <Trash2 size={18} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && !loading && <p style={{ textAlign: 'center', padding: '20px' }}>No courses available.</p>}
      </div>
    </div>
  );
};

// --- Styles ---
const tableWrapper = { background: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };
const headerRow = { background: '#4F46E5', color: '#fff' };
const th = { padding: '15px 20px', fontSize: '14px', textTransform: 'uppercase' };
const td = { padding: '15px 20px', borderBottom: '1px solid #F3F4F6', color: '#374151' };
const trStyle = { transition: '0.3s', ':hover': { background: '#F9FAFB' } };
const deleteBtn = { background: '#FEE2E2', color: '#EF4444', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' };
const refreshBtn = { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 15px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', cursor: 'pointer' };

export default ManageCourses;
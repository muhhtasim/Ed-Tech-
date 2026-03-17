import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ১. ডাটাবেজ থেকে কোর্সগুলো আনার ফাংশন
  const fetchCourses = async () => {
    try {
      // ব্যাকএন্ডের Search API ব্যবহার করছি
      const response = await axios.get(`http://localhost:5000/courses?search=${searchTerm}`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // ২. পেজ লোড হলে এবং সার্চ বক্সে কিছু লিখলে ডাটা আপডেট হবে
  useEffect(() => {
    fetchCourses();
  }, [searchTerm]);

  return (
    <div style={{ padding: '30px 5%' }}>
      {/* Hero Section / Search Bar */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#111827' }}>Find Your Perfect Course</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={searchBoxStyle}>
            <input 
              type="text" 
              placeholder="Search by course title..." 
              style={inputStyle}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search color="#6B7280" size={20} />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard 
              key={course.course_id} 
              course={course} 
              onRefresh={fetchCourses} // ৩. ডিলিট করার পর এই ফাংশনটি কল হবে
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: '#6B7280' }}>No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const searchBoxStyle = {
  display: 'flex', 
  alignItems: 'center',
  border: '1px solid #D1D5DB', 
  borderRadius: '30px', 
  padding: '8px 20px', 
  width: '100%', 
  maxWidth: '500px',
  background: '#fff'
};

const inputStyle = { 
  border: 'none', 
  outline: 'none', 
  width: '100%', 
  padding: '8px',
  fontSize: '16px'
};

export default Home;
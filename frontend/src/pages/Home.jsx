import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import { Filter, Search } from 'lucide-react';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // ১. লোকাল স্টোরেজ থেকে ইউজার আইডি নেওয়া
  const user = JSON.parse(localStorage.getItem('user'));

  const categories = ['All', 'Web Development', 'App Development', 'Graphic Design', 'Marketing', 'Programming'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      // ২. এপিআই কলে userId পাঠানো হচ্ছে যাতে কেনা কোর্সগুলো সার্ভার থেকেই ফিল্টার হয়ে আসে
      const url = user ? `http://localhost:5000/courses?userId=${user.id}` : 'http://localhost:5000/courses';
      const res = await axios.get(url);
      setCourses(res.data);
      setFilteredCourses(res.data);
    } catch (err) {
      console.log("Error fetching courses:", err);
    }
  };

  // সার্চ এবং ফিল্টার লজিক
  useEffect(() => {
    let result = courses;

    if (activeCategory !== 'All') {
      result = result.filter(course => course.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(result);
  }, [searchTerm, activeCategory, courses]);

  return (
    <div style={{ padding: '40px 8%', minHeight: '80vh' }}>
      <div style={headerSection}>
        <h1 style={{fontSize: '36px', color: '#111827'}}>Find Your Next Course</h1>
        <p style={{ color: '#6B7280' }}>Search from our library of professional online courses.</p>
      </div>

      {/* সার্চ বার সেকশন */}
      <div style={searchContainer}>
        <div style={searchWrapper}>
          <Search size={20} color="#9CA3AF" style={{ marginLeft: '15px' }} />
          <input 
            type="text" 
            placeholder="Search by course title (e.g. React, Python...)" 
            style={searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ফিল্টার বাটন সেকশন */}
      <div style={filterContainer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px' }}>
          <Filter size={18} color="#4F46E5" /> <strong>Filter:</strong>
        </div>
        <div style={btnGroup}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...filterBtnStyle,
                background: activeCategory === cat ? '#4F46E5' : '#fff',
                color: activeCategory === cat ? '#fff' : '#4B5563',
                border: activeCategory === cat ? '1px solid #4F46E5' : '1px solid #D1D5DB'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* কোর্স গ্রিড */}
      <div style={gridStyle}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.course_id} course={course} onRefresh={fetchCourses} />
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%', padding: '50px' }}>
             <p style={{ color: '#9CA3AF', fontSize: '18px' }}>No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const headerSection = { textAlign: 'center', marginBottom: '30px' };
const searchContainer = { display: 'flex', justifyContent: 'center', marginBottom: '30px' };
const searchWrapper = { display: 'flex', alignItems: 'center', background: '#fff', border: '2px solid #E5E7EB', borderRadius: '12px', width: '100%', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' };
const searchInput = { width: '100%', padding: '15px', border: 'none', outline: 'none', borderRadius: '12px', fontSize: '16px' };
const filterContainer = { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px', justifyContent: 'center', alignItems: 'center' };
const btnGroup = { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' };
const filterBtnStyle = { padding: '8px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: '0.3s' };
const gridStyle = { display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' };

export default Home;
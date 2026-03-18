import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import { Filter, Search, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const categories = ['All', 'Web Development', 'App Development', 'Graphic Design', 'Marketing', 'Programming'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const url = user ? `http://localhost:5000/courses?userId=${user.id || user.user_id}` : 'http://localhost:5000/courses';
      const res = await axios.get(url);
      setCourses(res.data);
      setFilteredCourses(res.data);
    } catch (err) {
      console.log("Error fetching courses:", err);
    }
  };

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
    <div style={{ padding: '0 8%', minHeight: '80vh' }}>
      
      {/* ১. Hero Section */}
      <div style={heroContainer}>
        <div style={heroBgGradient}></div>
        <div style={heroContent}>
          <div style={heroBadge}>
            <Zap size={14} color="#4F46E5" /> 
            <span>Future-Proof Your Career</span>
          </div>
          
          {/* 🔥 পুরো টাইটেল এখন গ্রেডিয়েন্ট */}
          <h1 style={heroTitle}>
            Master Modern Skills & Unlock Your Potential
          </h1>
          
          <p style={heroSubTitle}>
            Join thousands of students learning from industry experts. <br/>
            Access premium courses in technology, business, and design.
          </p>
          
          <div style={heroBtnGroup}>
            <Link to="/courses" style={{textDecoration: 'none'}}>
              <button style={heroPrimaryBtn}>
                Explore Courses <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/guideline" style={{textDecoration: 'none'}}>
              <button style={heroSecondaryBtn}>
                <Target size={18} /> View Learning Path
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ২. ফিল্টার এবং সার্চ সেকশন */}
      <div style={headerSection}>
        {/* 🔥 এই টাইটেলটিও এখন গ্রেডিয়েন্ট */}
        <h2 style={sectionTitleGradient}>Browse All Courses</h2>
        <p style={{ color: '#6B7280', fontSize: '16px' }}>Filter by category or search by title.</p>
      </div>

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

      {/* ৩. কোর্স গ্রিড */}
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

const heroContainer = {
  position: 'relative',
  padding: '100px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  overflow: 'hidden'
};

const heroBgGradient = {
  position: 'absolute',
  top: '-10%',
  left: '-10%',
  width: '120%',
  height: '120%',
  background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, rgba(255,255,255,0) 60%)',
  zIndex: -1
};

const heroContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  maxWidth: '900px'
};

const heroBadge = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 15px',
  background: '#EEF2FF',
  borderRadius: '20px',
  border: '1px solid rgba(79, 70, 229, 0.2)',
  fontSize: '14px',
  color: '#4F46E5',
  fontWeight: '600',
  boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
};

const heroTitle = {
  fontSize: '56px',
  fontWeight: '900',
  lineHeight: '1.2',
  letterSpacing: '-1px',
  margin: 0,
  background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
};

const heroSubTitle = {
  fontSize: '18px',
  color: '#6B7280',
  lineHeight: '1.6',
  margin: '10px 0 30px 0',
  maxWidth: '600px'
};

const heroBtnGroup = { display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' };

const heroPrimaryBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '15px 30px',
  fontSize: '16px',
  fontWeight: '700',
  background: '#4F46E5',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: '0.3s',
  boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)'
};

const heroSecondaryBtn = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '15px 30px',
  fontSize: '16px',
  fontWeight: '600',
  background: '#fff',
  color: '#4B5563',
  border: '1px solid #D1D5DB',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: '0.3s'
};

const sectionTitleGradient = {
  fontSize: '36px',
  fontWeight: '800',
  background: 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
  marginBottom: '10px'
};

const headerSection = { textAlign: 'center', marginBottom: '30px', marginTop: '80px' };
const searchContainer = { display: 'flex', justifyContent: 'center', marginBottom: '30px' };
const searchWrapper = { display: 'flex', alignItems: 'center', background: '#fff', border: '2px solid #E5E7EB', borderRadius: '12px', width: '100%', maxWidth: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' };
const searchInput = { width: '100%', padding: '15px', border: 'none', outline: 'none', borderRadius: '12px', fontSize: '16px' };
const filterContainer = { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px', justifyContent: 'center', alignItems: 'center' };
const btnGroup = { display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' };
const filterBtnStyle = { padding: '8px 20px', borderRadius: '25px', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: '0.3s' };
const gridStyle = { display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' };

export default Home;
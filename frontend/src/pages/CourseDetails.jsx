import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, CheckCircle, ArrowLeft, ShoppingCart } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/course/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!course) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={containerStyle}>
      <button onClick={() => navigate(-1)} style={backBtnStyle}><ArrowLeft size={18} /> Back</button>
      
      <div style={contentWrapper}>
        <div style={leftSection}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{course.title}</h1>
          <p style={categoryBadge}>{course.category}</p>
          <div style={descriptionBox}>
            <h3>What you'll learn:</h3>
            <ul style={listStyle}>
              <li><CheckCircle size={16} color="#10B981" /> Full lifetime access</li>
              <li><CheckCircle size={16} color="#10B981" /> Access on mobile and TV</li>
              <li><CheckCircle size={16} color="#10B981" /> Certificate of completion</li>
              <li><CheckCircle size={16} color="#10B981" /> 24/7 Support from teachers</li>
            </ul>
          </div>
        </div>

        <div style={rightCard}>
          <div style={priceBox}>
            <span style={{ fontSize: '14px', color: '#6B7280' }}>Course Price</span>
            <h2 style={{ fontSize: '28px', color: '#4F46E5', margin: '5px 0' }}>{course.price} BDT</h2>
          </div>
          <button style={buyButtonStyle} onClick={() => alert("Redirecting to Payment Gateway...")}>
            <ShoppingCart size={20} /> Enroll Now
          </button>
          <p style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '10px' }}>
            30-Day Money-Back Guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = { padding: '40px 10%', background: '#F9FAFB', minHeight: '90vh' };
const backBtnStyle = { border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', color: '#4F46E5', fontWeight: 'bold' };
const contentWrapper = { display: 'flex', gap: '40px', flexWrap: 'wrap' };
const leftSection = { flex: '2', minWidth: '300px' };
const categoryBadge = { background: '#EEF2FF', color: '#4F46E5', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold', fontSize: '14px' };
const descriptionBox = { marginTop: '30px', background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' };
const listStyle = { listStyle: 'none', padding: 0, marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' };
const rightCard = { flex: '1', background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', height: 'fit-content', border: '1px solid #E5E7EB' };
const priceBox = { borderBottom: '1px solid #F3F4F6', marginBottom: '20px', paddingBottom: '15px' };
const buyButtonStyle = { width: '100%', padding: '15px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' };

export default CourseDetails;
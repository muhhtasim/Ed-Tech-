import React, { useEffect, useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { BookOpen, CheckCircle, ArrowLeft, ShoppingCart } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    api.get(`/course/${id}`)
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
              <li><CheckCircle size={16} color="var(--success)" /> Full lifetime access</li>
              <li><CheckCircle size={16} color="var(--success)" /> Access on mobile and TV</li>
              <li><CheckCircle size={16} color="var(--success)" /> Certificate of completion</li>
              <li><CheckCircle size={16} color="var(--success)" /> 24/7 Support from teachers</li>
            </ul>
          </div>
        </div>

        <div style={rightCard}>
          <div style={priceBox}>
            <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Course Price</span>
            <h2 style={{ fontSize: '28px', color: 'var(--primary)', margin: '5px 0' }}>{course.price} BDT</h2>
          </div>
          <button style={buyButtonStyle} onClick={() => { addToast('Redirecting to Payment Gateway...', { type: 'info' }); }}>
            <ShoppingCart size={20} /> Enroll Now
          </button>
          <p style={{ fontSize: '12px', color: 'var(--muted-2)', textAlign: 'center', marginTop: '10px' }}>
            30-Day Money-Back Guarantee
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = { padding: '40px 10%', background: 'var(--surface)', minHeight: '90vh' };
const backBtnStyle = { border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', color: 'var(--primary)', fontWeight: 'bold' };
const contentWrapper = { display: 'flex', gap: '40px', flexWrap: 'wrap' };
const leftSection = { flex: '2', minWidth: '300px' };
const categoryBadge = { background: 'var(--primary-50)', color: 'var(--primary)', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold', fontSize: '14px' };
const descriptionBox = { marginTop: '30px', background: 'var(--bg)', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' };
const listStyle = { listStyle: 'none', padding: 0, marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' };
const rightCard = { flex: '1', background: 'var(--bg)', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', height: 'fit-content', border: '1px solid var(--border)' };
const priceBox = { borderBottom: '1px solid var(--surface)', marginBottom: '20px', paddingBottom: '15px' };
const buyButtonStyle = { width: '100%', padding: '15px', background: 'var(--primary)', color: 'var(--bg)', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' };

export default CourseDetails;
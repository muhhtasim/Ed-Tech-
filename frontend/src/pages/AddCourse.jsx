import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { PlusCircle } from 'lucide-react';

const AddCourse = () => {
  const [course, setCourse] = useState({ title: '', price: '', category: '' });
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/add-course', course);
      addToast('Success! New course added.', { type: 'success' });
      navigate('/'); // হোম পেজে নিয়ে যাবে যাতে নতুন কোর্সটি দেখা যায়
    } catch (error) {
      console.error(error);
      addToast('Failed to add course.', { type: 'error' });
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <PlusCircle color="var(--primary)" size={28} />
          <h2 style={{ margin: 0 }}>Add New Course</h2>
        </div>
        
        <form onSubmit={handleSubmit} style={formStyle}>
          <label>Course Title</label>
          <input 
            type="text" 
            placeholder="e.g. Master React in 30 Days" 
            style={inputStyle}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            required 
          />

          <label>Price (BDT)</label>
          <input 
            type="number" 
            placeholder="e.g. 2500" 
            style={inputStyle}
            onChange={(e) => setCourse({ ...course, price: e.target.value })}
            required 
          />

          <label>Category</label>
          <select 
            style={inputStyle} 
            onChange={(e) => setCourse({ ...course, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Marketing">Marketing</option>
          </select>

          <button type="submit" style={btnStyle}>Publish Course</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const containerStyle = { display: 'flex', justifyContent: 'center', padding: '50px 5%', background: 'var(--surface)', minHeight: '80vh' };
const formCardStyle = { background: 'var(--bg)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '16px' };
const btnStyle = { padding: '14px', background: 'var(--primary)', color: 'var(--bg)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' };

export default AddCourse;
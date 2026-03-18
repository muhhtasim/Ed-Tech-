import React, { useState, useEffect } from 'react';
import { User, Mail, GraduationCap, ShieldCheck, Edit3, Save } from 'lucide-react';

const Dashboard = () => {
  // ১. লোকাল স্টোরেজ থেকে ইউজারের ডাটা নেওয়া
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  // ২. প্রোফাইল আপডেট ফাংশন (আপাতত লোকাল স্টোরেজে সেভ হবে)
  const handleUpdate = () => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  if (!user) return <div style={{ padding: '50px', textAlign: 'center' }}>Please Login first!</div>;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={avatarStyle}>
          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 style={{ margin: '10px 0 5px 0' }}>Welcome, {user.name}!</h2>
        <span style={roleBadgeStyle}>{user.role === 'admin' ? 'Instructor / Admin' : 'Student'}</span>
      </div>

      <div style={infoCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0 }}>Profile Information</h3>
          <button onClick={() => setIsEditing(!isEditing)} style={editBtnStyle}>
            {isEditing ? 'Cancel' : <><Edit3 size={16} /> Edit Profile</>}
          </button>
        </div>

        <div style={gridStyle}>
          {/* Name Field */}
          <div style={fieldStyle}>
            <label style={labelStyle}><User size={16} /> Full Name</label>
            {isEditing ? (
              <input 
                style={inputStyle} 
                value={updatedUser.name} 
                onChange={(e) => setUpdatedUser({...updatedUser, name: e.target.value})} 
              />
            ) : <p style={valueStyle}>{user.name}</p>}
          </div>

          {/* Email Field */}
          <div style={fieldStyle}>
            <label style={labelStyle}><Mail size={16} /> Email Address</label>
            <p style={valueStyle}>{user.email}</p> 
            <small style={{color: '#9CA3AF'}}>(Email cannot be changed)</small>
          </div>

          {/* University Field */}
          <div style={fieldStyle}>
            <label style={labelStyle}><GraduationCap size={16} /> University</label>
            {isEditing ? (
              <input 
                style={inputStyle} 
                value={updatedUser.university || ''} 
                onChange={(e) => setUpdatedUser({...updatedUser, university: e.target.value})} 
              />
            ) : <p style={valueStyle}>{user.university || 'Not Provided'}</p>}
          </div>

          {/* Role Field */}
          <div style={fieldStyle}>
            <label style={labelStyle}><ShieldCheck size={16} /> Account Type</label>
            <p style={valueStyle}>{user.role.toUpperCase()}</p>
          </div>
        </div>

        {isEditing && (
          <button onClick={handleUpdate} style={saveBtnStyle}>
            <Save size={18} /> Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = { padding: '40px 10%', background: '#F3F4F6', minHeight: '90vh' };
const headerStyle = { textAlign: 'center', marginBottom: '30px' };
const avatarStyle = { width: '80px', height: '80px', background: '#4F46E5', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' };
const roleBadgeStyle = { background: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #C7D2FE' };
const infoCardStyle = { background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginTop: '20px' };
const fieldStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '14px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '8px' };
const valueStyle = { fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: 0 };
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #D1D5DB', outline: 'none', fontSize: '15px' };
const editBtnStyle = { background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' };
const saveBtnStyle = { marginTop: '30px', width: '100%', padding: '12px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };

export default Dashboard;
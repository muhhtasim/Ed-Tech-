import React from 'react';
import { User, Mail, ShieldCheck, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <div style={{ textAlign: 'center', marginTop: '100px' }}>Please login to view dashboard.</div>;

  return (
    <div style={{ padding: '60px 8%', minHeight: '80vh', background: 'var(--surface)' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={dashboardTitleGradient}>
          <LayoutDashboard size={36} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
          User Dashboard
        </h1>
      </div>

      <div style={profileCardStyle}>
        <div style={avatarContainer}>
          <User size={60} color="#fff" />
        </div>
        
        <h2 style={{ fontSize: '28px', color: 'var(--text-dark)', marginBottom: '5px' }}>{user.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '25px' }}>Member of Ed-Tech Community</p>
        
        <div style={infoGrid}>
          <div style={infoItem}>
            <Mail size={20} color="var(--primary)" />
            <div>
              <p style={labelStyle}>Email Address</p>
              <p style={valueStyle}>{user.email}</p>
            </div>
          </div>

          <div style={infoItem}>
            <ShieldCheck size={20} color="var(--success)" />
            <div>
              <p style={labelStyle}>Account Role</p>
              <p style={{ ...valueStyle, textTransform: 'capitalize' }}>{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const dashboardTitleGradient = {
  fontSize: '40px',
  fontWeight: '900',
  background: 'linear-gradient(90deg, var(--primary) 0%, var(--success) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block'
};

const profileCardStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  background: 'var(--bg)',
  padding: '40px',
  borderRadius: '24px',
  textAlign: 'center',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  border: '1px solid var(--surface)'
};

const avatarContainer = {
  width: '120px',
  height: '120px',
  background: 'linear-gradient(135deg, var(--primary) 0%, var(--success) 100%)',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto 20px auto',
  boxShadow: '0 10px 15px rgba(79, 70, 229, 0.3)'
};

const infoGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px', textAlign: 'left' };
const infoItem = { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'var(--surface)', borderRadius: '12px' };
const labelStyle = { fontSize: '12px', color: 'var(--muted-2)', margin: 0, fontWeight: 'bold', textTransform: 'uppercase' };
const valueStyle = { fontSize: '15px', color: 'var(--text-dark)', margin: 0, fontWeight: '600' };

export default Dashboard;
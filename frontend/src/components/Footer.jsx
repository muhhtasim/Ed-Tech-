import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        
        {/* Section 1: Brand Info */}
        <div style={sectionStyle}>
          <h2 style={{ color: '#4F46E5', marginBottom: '15px' }}>Ed-Tech</h2>
          <p style={{ color: '#6B7280', lineHeight: '1.6', fontSize: '14px' }}>
            Empowering learners worldwide with the best online courses and resources. 
            Join our community today.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Quick Links</h3>
          <ul style={listStyle}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/courses" style={linkStyle}>Courses</a></li>
            <li><a href="/guideline" style={linkStyle}>Guideline</a></li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Contact Us</h3>
          <div style={contactItem}>
            <MapPin size={16} color="#4F46E5" />
            <span style={textStyle}>Sylhet, Bangladesh</span>
          </div>
          <div style={contactItem}>
            <Phone size={16} color="#4F46E5" />
            <span style={textStyle}>+8801307663761</span>
          </div>
          <div style={contactItem}>
            <Mail size={16} color="#4F46E5" />
            <span style={textStyle}>muhtasimlabib52@gmail.com</span>
          </div>
        </div>

        {/* Section 4: Social Media */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Follow Us</h3>
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <Facebook style={socialIcon} size={20} />
            <Twitter style={socialIcon} size={20} />
            <Linkedin style={socialIcon} size={20} />
          </div>
        </div>

      </div>

      <div style={bottomBarStyle}>
        <p style={{ margin: 0 }}>© 2026 Ed-Tech Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Styles ---
const footerStyle = {
  background: '#ffffff',
  padding: '60px 8% 20px 8%',
  borderTop: '1px solid #E5E7EB',
  marginTop: '50px'
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '40px'
};

const sectionStyle = {
  flex: '1',
  minWidth: '200px'
};

const headingStyle = {
  fontSize: '18px',
  marginBottom: '20px',
  color: '#111827'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const linkStyle = {
  textDecoration: 'none',
  color: '#6B7280',
  fontSize: '14px',
  display: 'block',
  marginBottom: '10px',
  transition: '0.3s color'
};

const contactItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '12px'
};

const textStyle = {
  fontSize: '14px',
  color: '#6B7280'
};

const socialIcon = {
  color: '#4B5563',
  cursor: 'pointer',
  transition: '0.3s color'
};

const bottomBarStyle = {
  textAlign: 'center',
  marginTop: '50px',
  paddingTop: '20px',
  borderTop: '1px solid #F3F4F6',
  color: '#9CA3AF',
  fontSize: '13px'
};

export default Footer;

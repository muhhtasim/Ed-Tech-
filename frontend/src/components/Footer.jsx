import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={footerContainer}>
        
        {/* ১. ব্র্যান্ড এবং ডেসক্রিপশন */}
        <div style={sectionStyle}>
          <Link to="/" style={logoStyle}>
            <BookOpen color="var(--primary)" size={28} />
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>Ed-Tech</h2>
          </Link>
          <p style={textStyle}>
            The best platform to learn modern technologies from industry experts. Start your journey today!
          </p>
          <div style={socialIcons}>
            <Facebook size={20} style={iconStyle} />
            <Twitter size={20} style={iconStyle} />
            <Linkedin size={20} style={iconStyle} />
            <Github size={20} style={iconStyle} />
          </div>
        </div>

        {/* ২. কুইক লিঙ্কস */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Quick Links</h4>
          <ul style={ulStyle}>
            <li><Link to="/" style={footerLink}>Home</Link></li>
            <li><Link to="/courses" style={footerLink}>All Courses</Link></li>
            <li><Link to="/guideline" style={footerLink}>Guideline</Link></li>
            <li><Link to="/about" style={footerLink}>About Us</Link></li>
          </ul>
        </div>

        {/* ৩. কন্টাক্ট ইনফো */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Contact Us</h4>
          <ul style={ulStyle}>
            <li style={contactItem}><Mail size={16} /> muhtasimlabib52@gmail.com</li>
            <li style={contactItem}><Phone size={16} /> +8801307663761</li>
            <li style={contactItem}><MapPin size={16} /> Sylhet, Bangladesh</li>
          </ul>
        </div>

        {/* ৪. নিউজলেটার (Newsletter) */}
        <div style={sectionStyle}>
          <h4 style={headingStyle}>Newsletter</h4>
          <p style={{ ...textStyle, fontSize: '13px' }}>Subscribe to get latest course updates.</p>
          <div style={newsletterBox}>
            <input type="email" placeholder="Email" style={inputStyle} />
            <button style={subscribeBtn}>Join</button>
          </div>
        </div>

      </div>

      {/* ৫. কপিরাইট সেকশন */}
      <div style={bottomFooter}>
        <p>© 2026 Ed-Tech Learning Platform. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={footerLink}>Privacy Policy</span>
          <span style={footerLink}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

// --- Styles ---
const footerStyle = { background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '60px 8% 20px 8%', marginTop: '50px' };
const footerContainer = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' };
const sectionStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const logoStyle = { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' };
const headingStyle = { fontSize: '18px', fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '10px' };
const textStyle = { color: 'var(--muted)', lineHeight: '1.6', fontSize: '14px' };
const ulStyle = { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' };
const footerLink = { textDecoration: 'none', color: 'var(--muted-2)', fontSize: '14px', cursor: 'pointer', transition: '0.3s' };
const socialIcons = { display: 'flex', gap: '15px', marginTop: '10px' };
const iconStyle = { color: 'var(--primary)', cursor: 'pointer' };
const contactItem = { display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted-2)', fontSize: '14px' };
const newsletterBox = { display: 'flex', gap: '5px', marginTop: '5px' };
const inputStyle = { padding: '8px 12px', borderRadius: '5px', border: '1px solid var(--border)', width: '100%', outline: 'none' };
const subscribeBtn = { background: 'var(--primary)', color: 'var(--bg)', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' };
const bottomFooter = { borderTop: '1px solid var(--surface)', marginTop: '40px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--muted-2)', fontSize: '12px' };

export default Footer;
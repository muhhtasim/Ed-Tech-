import React from 'react';
import { BookOpen, Video, Globe, Code, Layout, Smartphone, ExternalLink } from 'lucide-react';

const Guideline = () => {
  // ১. এখানে আমি অরিজিনাল রিসোর্স লিঙ্কগুলো অ্যাড করে দিয়েছি
  const resources = [
    { 
      id: 1, 
      title: "Complete HTML & CSS Guide", 
      type: "Documentation", 
      link: "https://developer.mozilla.org/en-US/docs/Learn", 
      icon: <Layout size={20} />, 
      desc: "Learn the foundation of web development from MDN Web Docs."
    },
    { 
      id: 2, 
      title: "Modern JavaScript (ES6+)", 
      type: "Tutorial", 
      link: "https://javascript.info/", 
      icon: <Code size={20} />, 
      desc: "Deep dive into JavaScript from basic to advanced concepts."
    },
    { 
      id: 3, 
      title: "React JS Crash Course", 
      type: "Video", 
      link: "https://www.youtube.com/results?search_query=react+js+tutorial", 
      icon: <Video size={20} />, 
      desc: "Top-rated video tutorials to master React library."
    },
    { 
      id: 4, 
      title: "SQL & Database Design", 
      type: "Article", 
      link: "https://www.w3schools.com/sql/", 
      icon: <BookOpen size={20} />, 
      desc: "Master MySQL and relational database management."
    },
    { 
      id: 5, 
      title: "UI/UX Design Principles", 
      type: "Course", 
      link: "https://www.figma.com/resource-library/design-basics/", 
      icon: <Globe size={20} />, 
      desc: "Learn how to design beautiful user interfaces using Figma."
    },
    { 
      id: 6, 
      title: "Mobile App Development", 
      type: "Roadmap", 
      link: "https://roadmap.sh/android", 
      icon: <Smartphone size={20} />, 
      desc: "Step by step guide to becoming an Android/iOS developer."
    },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerSection}>
        <h1 style={{ color: '#111827', fontSize: '32px', marginBottom: '10px' }}>Learning Guidelines</h1>
        <p style={{ color: '#6B7280', maxWidth: '600px', margin: '0 auto' }}>
          We have curated the best resources from the internet to help you become a professional developer.
        </p>
      </div>

      <div style={gridStyle}>
        {resources.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div style={iconBoxStyle}>{item.icon}</div>
            <h3 style={titleStyle}>{item.title}</h3>
            <span style={badgeStyle}>{item.type}</span>
            <p style={descStyle}>{item.desc}</p>
            
            {/* ২. View Resource এ ক্লিক করলে নতুন ট্যাবে লিঙ্ক ওপেন হবে */}
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={linkButtonStyle}
            >
              View Resource <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Styles (Modern & Clean) ---
const containerStyle = { padding: '60px 10%', background: '#F9FAFB', minHeight: '100vh' };
const headerSection = { textAlign: 'center', marginBottom: '50px' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' };

const cardStyle = {
  background: '#fff',
  padding: '30px',
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
  border: '1px solid #E5E7EB',
  display: 'flex',
  flexDirection: 'column',
  transition: '0.3s transform',
  cursor: 'default'
};

const iconBoxStyle = {
  width: '45px',
  height: '45px',
  background: '#EEF2FF',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#4F46E5',
  marginBottom: '20px'
};

const titleStyle = { margin: '0 0 10px 0', fontSize: '20px', color: '#1F2937' };
const badgeStyle = { fontSize: '11px', background: '#F3F4F6', color: '#6B7280', padding: '3px 10px', borderRadius: '5px', fontWeight: 'bold', width: 'fit-content', marginBottom: '15px', textTransform: 'uppercase' };
const descStyle = { fontSize: '14px', color: '#6B7280', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 };

const linkButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  textDecoration: 'none',
  background: '#4F46E5',
  color: '#fff',
  padding: '10px',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '14px',
  transition: '0.3s'
};

export default Guideline;
import React from 'react';
import { BookOpen, Video, FileText, ExternalLink } from 'lucide-react';

const Guideline = () => {
  const resources = [
    { id: 1, title: "Web Development Roadmap", type: "PDF", link: "#", icon: <FileText size={20} /> },
    { id: 2, title: "React Crash Course for Beginners", type: "Video", link: "#", icon: <Video size={20} /> },
    { id: 3, title: "Database Design Best Practices", type: "Article", link: "#", icon: <BookOpen size={20} /> },
  ];

  return (
    <div style={{ padding: '40px 10%', backgroundColor: '#f9fafb', minHeight: '90vh' }}>
      <h1 style={{ color: '#111827', marginBottom: '10px' }}>Learning Guideline</h1>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>Follow these resources to master your skills.</p>

      <div style={{ display: 'grid', gap: '20px' }}>
        {resources.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={iconBoxStyle}>{item.icon}</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{item.title}</h3>
                <span style={{ fontSize: '12px', color: '#4F46E5', fontWeight: 'bold' }}>{item.type}</span>
              </div>
            </div>
            <a href={item.link} style={linkButtonStyle}>
              View Resource <ExternalLink size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb'
};

const iconBoxStyle = {
  padding: '12px',
  background: '#EEF2FF',
  borderRadius: '10px',
  color: '#4F46E5'
};

const linkButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  color: '#4F46E5',
  fontWeight: '600',
  fontSize: '14px'
};

export default Guideline;
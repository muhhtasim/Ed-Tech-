import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [newName, setNewName] = useState(user?.name || '');
  const [newUni, setNewUni] = useState(user?.university || '');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/update-user/${user.id}`, {
        full_name: newName,
        university: newUni
      });
      alert("Profile Updated!");
      // Local storage update kora jate refresh korle thik thake
      const updatedUser = { ...user, name: newName, university: newUni };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      alert("Update failed!");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '80vh', padding: '20px' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', borderRight: '1px solid #ddd', padding: '20px' }}>
        <h3>Dashboard</h3>
        <p>My Courses</p>
        <p style={{ color: '#4F46E5', fontWeight: 'bold' }}>Settings</p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Welcome, {newName}!</h2>
        <div style={{ maxWidth: '400px', background: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
          <h3>Update Profile</h3>
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>Full Name:</label>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} style={inputStyle} />
            
            <label>University:</label>
            <input type="text" value={newUni} onChange={(e) => setNewUni(e.target.value)} style={inputStyle} />
            
            <button type="submit" style={btnStyle}>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px', background: '#4F46E5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default Dashboard;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import api from '../utils/api';
import { CreditCard, Smartphone, Landmark, CheckCircle, Loader2 } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  
  // ১. CourseCard থেকে পাঠানো ডাটা রিসিভ করা (Destructuring with fallback)
  const { courseId, courseTitle, price } = location.state || {};
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    // ডাটা ভ্যালিডেশন
    if (!courseId) { addToast('Course information missing! Please go back and try again.', { type: 'error' }); return navigate(-1); }
    if (!selectedMethod) { addToast('Please select a payment method!', { type: 'warning' }); return; }
    if (!user) { addToast('Please login first!', { type: 'warning' }); return navigate('/login'); }

    // ২. ইউজার আইডি ডাইনামিক চেক (id বা user_id যেটা আপনার DB-তে আছে)
    const userId = user.id || user.user_id;

    try {
      setIsProcessing(true);

      // ৩. ব্যাকএন্ডে এনরোলমেন্ট রিকোয়েস্ট
      const response = await api.post('/enroll', {
        user_id: userId,
        course_id: courseId
      });

      if (response.status === 200) {
        addToast(`🎉 Success! You have enrolled in ${courseTitle}.`, { type: 'success' });
        navigate('/dashboard'); 
      }
    } catch (err) {
      console.error("Enrollment Error:", err);
      addToast(err.response?.data?.message || "Something went wrong! Check if your backend is running.", { type: 'error' });
    } finally {
      setIsProcessing(false);
    }
  };

  // যদি সরাসরি কেউ URL এ টাইপ করে এই পেজে আসে, তাকে ফেরত পাঠাবে
  if (!courseId) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h3>Invalid Session</h3>
        <button onClick={() => navigate('/')} style={payBtnStyle}>Go Back to Courses</button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Checkout</h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
          Finalizing purchase for: <br/> <strong>{courseTitle}</strong>
        </p>
        
        <div style={priceTag}>{price} BDT</div>

        <h4 style={{ marginBottom: '15px', color: '#374151' }}>Select Payment Method:</h4>
        
        <div style={methodList}>
          {/* bKash */}
          <div 
              onClick={() => setSelectedMethod('bkash')} 
              style={{ ...methodItem, borderColor: selectedMethod === 'bkash' ? '#D10056' : 'var(--border)', background: selectedMethod === 'bkash' ? '#FFF5F8' : 'var(--bg)' }}
            >
              <Smartphone color="#D10056" />
            <span style={{fontWeight: '500'}}>bKash Payment</span>
          </div>

          {/* Bank */}
          <div 
            onClick={() => setSelectedMethod('bank')} 
            style={{ ...methodItem, borderColor: selectedMethod === 'bank' ? 'var(--primary)' : 'var(--border)', background: selectedMethod === 'bank' ? 'var(--primary-50)' : 'var(--bg)' }}
          >
            <Landmark color="var(--primary)" />
            <span style={{fontWeight: '500'}}>Bank Transfer</span>
          </div>

          {/* Card */}
          <div 
            onClick={() => setSelectedMethod('card')} 
            style={{ ...methodItem, borderColor: selectedMethod === 'card' ? 'var(--success)' : 'var(--border)', background: selectedMethod === 'card' ? '#F0FDF4' : 'var(--bg)' }}
          >
            <CreditCard color="var(--success)" />
            <span style={{fontWeight: '500'}}>Card Payment</span>
          </div>
        </div>

        <button 
          onClick={handlePayment} 
          disabled={isProcessing} 
          style={{ ...payBtnStyle, opacity: isProcessing ? 0.7 : 1 }}
        >
          {isProcessing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Loader2 className="animate-spin" size={20} /> Processing...
            </div>
          ) : (
            <><CheckCircle size={20} /> Pay & Enroll Now</>
          )}
        </button>
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', background: 'var(--surface)' };
const cardStyle = { background: 'var(--bg)', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' };
const priceTag = { textAlign: 'center', fontSize: '30px', fontWeight: 'bold', color: 'var(--primary)', margin: '20px 0', padding: '15px', background: 'var(--primary-50)', borderRadius: '12px' };
const methodList = { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' };
const methodItem = { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '12px', cursor: 'pointer', border: '2px solid transparent', transition: '0.3s ease' };
const payBtnStyle = { width: '100%', padding: '15px', background: 'var(--primary)', color: 'var(--bg)', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' };

export default Payment;
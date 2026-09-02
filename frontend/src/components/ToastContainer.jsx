import React from 'react';
import { useToast } from '../contexts/ToastContext';

const Toast = ({ toast, onClose }) => (
  <div className="toast-item" role="status">
    <div style={{ fontWeight: 600, marginBottom: 6 }}>{toast.type.toUpperCase()}</div>
    <div>{toast.message}</div>
    <button onClick={() => onClose(toast.id)} style={{ marginTop: 8, background: 'transparent', border: 'none', color: 'var(--muted-2)', cursor: 'pointer' }}>Dismiss</button>
  </div>
);

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onClose={removeToast} />
      ))}
    </div>
  );
}

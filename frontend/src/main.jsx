import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './utils/api' // initialize axios interceptors
import auth from './utils/auth';
import { ToastProvider } from './contexts/ToastContext';
import ToastContainer from './components/ToastContainer';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <ToastContainer />
    </ToastProvider>
  </StrictMode>,
)

// initialize auth silently (will try to refresh from cookie)
auth.initAuth().catch(() => {});

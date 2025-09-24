import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <WishlistProvider> {/* This provider was added */}
            <App />
            <Toaster position="bottom-right" />
          </WishlistProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
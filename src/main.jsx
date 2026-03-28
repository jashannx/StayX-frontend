import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

import App from './App.jsx'
import Index from './components/index.jsx'
import NewListing from './pages/NewListing.jsx'
import EditListing from './pages/EditListing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import ProtectedLayout from './components/PrivateLayout.jsx'

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>

          {/* ❌ No Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ With Navbar/Footer */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/listings" element={<ProtectedRoute><App /></ProtectedRoute>} />
            <Route path="/listings/new" element={<ProtectedRoute><NewListing /></ProtectedRoute>} />
            <Route path="/listings/:id" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/listings/:id/edit" element={<ProtectedRoute><EditListing /></ProtectedRoute>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={
            <div className="container mt-4">
              <h2>404 - Page Not Found</h2>
            </div>
          } />

        </Routes>
      </BrowserRouter>
      </CookiesProvider>
  </React.StrictMode>
)

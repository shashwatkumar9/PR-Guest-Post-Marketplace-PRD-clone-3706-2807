import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import ListingDetails from './pages/ListingDetails';
import CreateListing from './pages/CreateListing';
import AdminPanel from './pages/admin/AdminPanel';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Transactions from './pages/Transactions';
import MyWebsites from './pages/MyWebsites';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

// Static Pages
import PrivacyPolicy from './pages/static/PrivacyPolicy';
import TermsOfService from './pages/static/TermsOfService';
import FAQ from './pages/static/FAQ';
import ContactUs from './pages/static/ContactUs';
import HelpCenter from './pages/static/HelpCenter';

// Providers
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/listing/:id" element={<ListingDetails />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/create-listing" element={<ProtectedRoute><CreateListing /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                  <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                  <Route path="/my-websites" element={<ProtectedRoute><MyWebsites /></ProtectedRoute>} />
                  <Route path="/admin/*" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
                  
                  {/* Blog Routes */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  
                  {/* Static Pages */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/help-center/:slug" element={<HelpCenter />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <Toaster 
              position="top-right" 
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }} 
            />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
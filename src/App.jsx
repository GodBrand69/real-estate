import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import Properties from './pages/Properties'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/footer';
import NotFoundPage from './components/Notfound';
import 'react-toastify/dist/ReactToastify.css';
// import Hero from './components/Hero';
// import FeaturedProperties from './components/FeaturedProperties';
import PropertyDetails from './components/properties/PropertyDetails';
import Home from './pages/Home';
import AddProperty from './pages/AddProperty';

// export const Backendurl = import.meta.env.VITE_API_BASE_URL;
export const Backendurl = 'xyz.cum'

// Admin Protected Route Component
const AdminRoute = ({ children }) => {
  // TODO: Replace this with actual admin check from your auth system
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/signup" element={<Signup key="signup" />} />
      <Route path="/login" element={<Login key="login" />} />
      <Route path="/" element={<Home key="home" />} />
      <Route path="/properties" element={<Properties key="properties" />} />
      <Route path="/properties/:id" element={<PropertyDetails key="property-details" />} />
      <Route 
        path="/add-property" 
        element={
          <AdminRoute>
            <AddProperty key="add-property" />
          </AdminRoute>
        } 
      />
      <Route path="*" element={<NotFoundPage key="not-found" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      {/* Base website structured data */}
      
      <Navbar />
      <AppRoutes />
      <Footer />
      <ToastContainer />
    </Router>
  )
}

export default App
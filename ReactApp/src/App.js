// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import

// Components
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './components/Login/Login';
import AllProductsPage from './pages/AllProductsPage/AllProductsPage';

// Helper functions
import { isAuthenticated, getToken } from './hooks/useAuth';
import Basket from './components/Basket/Basket';

// Function to check if the token is still valid
const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    return decodedToken.exp > currentTime;
  } catch (e) {
    return false; // Token decoding failed or expired
  }
};

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state, e.g., fetching user data
    const checkAuth = async () => {
      // Add your auth initialization logic here if needed
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/AllProducts"
          element={<ProtectedRoute element={<AllProductsPage />} />}
        />
         <Route
          path="/basket"
          element={<ProtectedRoute element={<Basket />} />}
        />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to HomePage */}
      </Routes>
    </Router>
  );
};

export default App;

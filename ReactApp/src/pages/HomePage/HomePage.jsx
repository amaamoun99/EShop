import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handler function to navigate to the All Products page
  const goToAllProducts = () => {
    navigate('/AllProducts');
  };

  return (
    <>
      <h1>Home Page</h1>
      <button type="button" onClick={goToAllProducts}>Go To All Products</button>
    </>
  );
};

export default HomePage;

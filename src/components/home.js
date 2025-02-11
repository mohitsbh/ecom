import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for navigation

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Home Page</h1>
      <p>Explore our website to find the best products and services.</p>
      
      {/* Example navigation links */}
      {/* <div> */}
        <Link to="/categories/1" style={{ margin: '0 10px' }}>Browse Products</Link>
        {/* <Link to="/about" style={{ margin: '0 10px' }}>About Us</Link> */}
      {/* </div> */}
      
      {/* Optional image or content */}
      {/* <img 
        src="https://via.placeholder.com/600x300" 
        alt="Home Page Banner" 
        style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}
      /> */}
    </div>
  );
}

export default Home;

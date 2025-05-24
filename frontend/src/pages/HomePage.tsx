import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
 

 const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <h1>Welcome to the Home Page</h1>
      <p>This is a simple React application with routing.</p>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
}
export default HomePage;
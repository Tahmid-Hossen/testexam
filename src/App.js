import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCategory from './components/ProductCategory';
import ProductDetails from './components/ProductDetails';
// import FooterArea from './components/FooterArea';
import './components/product.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCategory />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;

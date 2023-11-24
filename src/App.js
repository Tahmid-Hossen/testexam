import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import './styles.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCategory from './ProductCategory';

function App() {
  return (
    <div className="App">
      <main>
        <ProductCategory />
      </main>
    </div>
  );
}

export default App;

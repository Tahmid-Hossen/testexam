import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      console.log('API Response:', response.data); // Log the entire data
      const responseData = response.data || {};
      const productsArray = responseData.products || [];

      setProducts(productsArray);

      // Set unique categories
      const uniqueCategories = new Set(productsArray.map(product => product.category));
      setUniqueCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <div className="uniqueCategoryList">
        <ul>
          {[...uniqueCategories].map(category => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={category === selectedCategory ? 'selected' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="productlistArea">
        <Row>
          {filteredProducts.map((product) => (
            <Col sm={4} key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ maxWidth: '200px', maxHeight: '100px', width: 'auto', height: 'auto' }}
              />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ProductList;

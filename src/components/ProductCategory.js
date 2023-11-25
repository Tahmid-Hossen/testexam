import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const responseData = response.data || {};
      const productsArray = responseData.products || [];

      setProducts(productsArray);
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
    setCurrentPage(1);
  };

  const handlePriceChange = (event) => {
    setSelectedPriceRange(event.target.value);
    setCurrentPage(1);
  };

  const applyFilters = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-');
      filtered = filtered.filter(product => product.price >= parseInt(min) && product.price <= parseInt(max));
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryFullClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1); // Reset page when category changes
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedPriceRange, products]);

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
          <li>
            <Link to="/" onClick={() => handleCategoryFullClick('')}>
              Home
            </Link>
          </li>
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

      <Form className="priceFilter">
        <Form.Group controlId="priceRange">
          <Form.Label>Price Range:</Form.Label>
          <Form.Control as="select" onChange={handlePriceChange} value={selectedPriceRange}>
            <option value="">All</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201-500">$201 - $500</option>
            <option value="501-1000">$501 - $1000</option>
            <option value="1001-2000">$1001 - $2000</option>
            <option value="2001-3000">$2001 - $3000</option>
          </Form.Control>
        </Form.Group>
      </Form>

      <div className="productListArea">
        <Row>
          {filteredProducts
            .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
            .map((product) => (
              <Col sm={3} key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <div className="singleProduct">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ maxWidth: '200px', maxHeight: '100px', width: 'auto', height: 'auto' }}
                    />
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                </Link>
              </Col>
            ))}
        </Row>
      </div>

      <div className="pagination">
        <ul>
          {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map(number => (
            <li key={number + 1} className={currentPage === number + 1 ? 'active' : ''}>
              <button onClick={() => paginate(number + 1)}>{number + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default ProductList;

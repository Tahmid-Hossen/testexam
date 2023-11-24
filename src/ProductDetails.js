import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './product.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState("https://source.unsplash.com/W1yjvf5idqA");
  const productImages = [
    "https://source.unsplash.com/W1yjvf5idqA",
    "https://source.unsplash.com/VgbUxvW3gS4",
    "https://source.unsplash.com/5WbYFH0kf_8",
  ];

  const changeImage = (imageSrc) => {
    setActiveImage(imageSrc);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data); // Assuming your API returns the product details
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>No product found for ID: {id}</p>;
  }

  return (
    <div className="container">
      <div className="grid product">
        <div className="column-xs-12 column-md-7">
          <div className="product-gallery">
            <div className="product-image">
              <img className="active" src={product.thumbnail} alt="Product" />
            </div>
            <ul className="image-list">
              {productImages.map((image, index) => (
                <li key={index} className="image-item">
                  <img src={product.thumbnail} alt={`Product ${index + 1}`} onClick={() => changeImage(image)} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="column-xs-12 column-md-5">
          <h1>{product.title}</h1>
          <h2>Price: ${product.price}</h2>
          <div className="description">
            <p>{product.description}</p>
          </div>
          <button className="add-to-cart">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

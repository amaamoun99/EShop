import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AllProducts.module.css'; // Make sure this CSS module exists and is correctly imported
import Product from '../../components/Product/Product'; // Adjust the import path based on your project structure

const AllProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('jwtToken'); // Get token from local storage

            // Check if token exists before making the request
            if (!token) {
                setError('No authentication token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8081/api/v1/products', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in request headers
                    }
                });
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err.response?.data || err.message || err); // Log detailed error info
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <h1>All Products</h1>
        <div className={styles.productList}>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map(product => (
                    <Product 
                        key={product.id} 
                        productId={product.id} // Pass the product ID to Product component
                    />
                ))
            )}
        </div>
        </>
    );
};

export default AllProductsPage;

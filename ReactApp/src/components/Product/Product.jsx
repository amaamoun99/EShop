import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Product.module.css';
import { getUserId } from '../../hooks/useAuth';

const Product = ({ productId}) => { // Destructuring userId from props
    const userId = getUserId()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/v1/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Correct format
                    }
                });
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const addProductToUser = async () => {
        const token = localStorage.getItem('jwtToken');
        try {
            await axios.post(`http://localhost:8081/api/v1/users/${userId}/products/${productId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Product added to your list successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to add product.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.productCard}>
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
            <h3>${product.price}</h3>
            <button type="button" onClick={addProductToUser}>Add to My List</button>
        </div>
    );
};

export default Product;

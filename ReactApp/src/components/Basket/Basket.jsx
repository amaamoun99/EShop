import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Basket.module.css'; // Ensure you have a CSS module or style as needed
import { getUserId, getUserName } from "../../hooks/useAuth"; // Import the function to get the user ID

const Basket = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const name = getUserName();

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem("jwtToken");
            const userId = getUserId(); // Get the user ID from authentication

            // Check if token and user ID exist before making the request
            if (!token || !userId) {
                setError("No authentication token or user ID found.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8081/api/v1/users/${userId}/basket`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request headers
                    },
                });
                setProducts(response.data); // Set the products in state
            } catch (err) {
                console.error("Error fetching user products:", err.response?.data || err.message || err); // Log detailed error info
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    // Calculate total price
    const calculateTotalPrice = () => {
        return products.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    const totalPrice = calculateTotalPrice();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // If no products, show a message
    if (products.length === 0) {
        return <p>Your basket is empty.</p>;
    }

    return (
        <div className={styles.basketContainer}>
            <h1>Hello {name}</h1>
            <h2>Your Basket</h2>
            <div className={styles.basketItems}>
                {products.map((product) => (
                    <div key={product.id} className={styles.basketItem}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className={styles.totalPrice}>
                <h3>Total Price: ${totalPrice}</h3>
            </div>
        </div>
    );
};

export default Basket;

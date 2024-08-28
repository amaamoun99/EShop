import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Replace this with your actual JWT token retrieval logic
    const token = `${localStorage.getItem('jwtToken')}`;

    // Define the function to handle button click
    const handleButtonClick = () => {
        setLoading(true); // Set loading state to true

        axios.get('http://localhost:8081/api/v1/users', {
            headers: {
                Authorization: `Bearer ${token}` // Correct format
            }
        })
        .then(response => {
            setData(response.data); // Set data from the response
            setLoading(false); // Set loading state to false
        })
        .catch(error => {
            setError(error); // Set error if there is one
            setLoading(false); // Set loading state to false
        });
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Fetch Data</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                 <div>
                 <h1>User First Names</h1>
                 <ul>
                     {data.map((user, index) => (
                         <li key={index}>{user.firstName}</li> // Display only the firstName of each user
                     ))}
                 </ul>
             </div>
            )}
        </div>
    );
};

export default MyComponent;

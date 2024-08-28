import {jwtDecode} from 'jwt-decode'; // Ensure correct import

export const isAuthenticated = () => {
    const token = getToken();
    return isTokenValid(token);
};

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

// Function to check if the token is valid
export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        return decodedToken.exp > currentTime;
    } catch (e) {
        return false; // Token decoding failed or expired
    }
};

// Function to get userID from the token
export const getUserName = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub || null; // Assuming userId is in the 'sub' claim
    } catch (e) {
        return null; // Token decoding failed
    }
}

// Function to get userID from the token
export const getUserId = () => {
    const token = getToken();
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId || null; // Assuming userId is in the 'sub' claim
    } catch (e) {
        return null; // Token decoding failed
    }

    
};

import { jwtDecode } from 'jwt-decode';
import { Store } from '../redux/store/MyStore';
import { logout } from '../redux/slices/authSlice';


export const getToken = () => {
    return localStorage.getItem('loginToken'); 
};

export const isTokenExpired = (token) => {
    if (!token) return true; // If there's no token, treat as expired
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    return decodedToken.exp < currentTime; // Check expiration
};

// New function to check token and dispatch logout
export const checkTokenAndLogout = () => {
    const token = getToken();
    if (isTokenExpired(token)) {
        Store.dispatch(logout());
        throw new Error('Token expired, please log in again.'); 
    }
};

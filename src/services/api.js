// src/services/api.js
import axios from 'axios';
// import {isTokenExpired} from './tokenService';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export default API_BASE_URL;

// Crear una instancia de axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Tiempo de espera de 10 segundos
    headers: {
      'Content-Type': 'application/json',
    },
});


// Set up Axios interceptor to add the Authorization header
// api.interceptors.request.use(
//     async (config) => {
//         // console.log(config)
//         let accessToken = sessionStorage.getItem('accessToken');  // Get the access token from storage

//         if (isTokenExpired(accessToken)) {
//             console.log('token expired')
//             const newToken = await apiRefreshToken(); // If expired, refresh token (optional)
//             sessionStorage.setItem('accessToken', newToken); // Store the new token
//             accessToken = newToken
//         } 
        
//         if (accessToken) {
//             config.headers['Authorization'] = `Bearer ${accessToken}`; // Attach token to headers
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error); // Handle request errors
//     }
// );


// GET inheritance by Id
export const apiGetInheritance = async (inheritanceId) => {
    try {
        const response = await api.get(`/inheritance/${inheritanceId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// GET all inheritances 
export const apiGetInheritances = async () => {
    try {
        const response = await api.get(`/inheritances`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// POST save new inheritance
export const apiSaveInheritance = async (inheritance) => {
    
    try {
        const response = await api.post(`/inheritance`, inheritance)
        return response.data
    } catch (error) {
        throw error;
    }
};

// PUT edit existing inheritance
export const apiEditInheritance = async (inheritance) => {
    
    try {
        const response = await api.put(`/inheritance/${inheritance.id}`, inheritance)
        return response.data
    } catch (error) {
        throw error;
    }
};

export const apiCalculate = async (inheritanceId) => {
    try {
        const response = await api.post(`/inheritance/${inheritanceId}/calculate`, )
        return response.data
    } catch (error) {
        throw error;
    }
}


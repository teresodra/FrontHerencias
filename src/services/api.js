// src/services/api.js
import axios from 'axios';
import {isTokenExpired} from './tokenService';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log(API_BASE_URL)
console.log(process.env.REACT_APP_USER_POOL_ID)

export default API_BASE_URL;

// Crear una instancia de axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Tiempo de espera de 10 segundos
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies with each request
});


// Set up Axios interceptor to add the Authorization header
api.interceptors.request.use(
    async (config) => {
        // console.log(config)
        let accessToken = sessionStorage.getItem('accessToken');  // Get the access token from storage

        if (isTokenExpired(accessToken)) {
            console.log('token expired')
            const newToken = await apiRefreshToken(); // If expired, refresh token (optional)
            sessionStorage.setItem('accessToken', newToken); // Store the new token
            accessToken = newToken
        } 
        
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`; // Attach token to headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

//POST refresh access token
const apiRefreshToken = async () => {
    
    try {
        const result = await axios.post(`${API_BASE_URL}/auth/token/refresh`, null,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return result.data.accessToken;
    } catch (error) {
        throw error;
    }
}

// POST send token
export const apiSendRefreshToken = async (refresToken) => {
    try {
        const result = await api.post(
            '/auth/token',
            refresToken
        );
        console.log(result)
    } catch (error) {
        // throw error;
        console.log(error)
    }
}

// DELETE token
export const apiDeleteRefreshToken = async () =>{
    try {
        const result = await api.delete('/auth/token');
        console.log(result)
    } catch (error) {
        console.log(error)
        throw error
    }
}

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
export const apiGetInheritancesList = async () => {
    try {
        const response = await api.get(`/inheritance/list`);
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

// PATCH send valuation
export const apiAddValuation = async (inheritanceId, valuation) => {
    try {
        const response = await api.patch(`/inheritance/${inheritanceId}/valuation`, valuation)
        return response.data
    } catch (error) {
        throw error;
    }
}

// DELETE inheriance
export const apiDeleteInheritance = async (inheritanceId) => {
    try {
        await api.delete(`/inheritance/${inheritanceId}`)
    } catch (error) {
        throw error;
    }
}

// PUT edit existing inheritance
// export const apiEditInheritance = async (inheritance) => {
    
//     try {
//         const response = await api.put(`/inheritance/${inheritance.id}`, inheritance)
//         return response.data
//     } catch (error) {
//         throw error;
//     }
// };

// POST send message to SQS indicating the inheritance to calculate
export const apiCalculate = async (inheritanceId) => {
    try {
        const response = await api.post(`/inheritance/${inheritanceId}/calculate`, )
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error;
    }
}

export const apiGetSolution = async (inheritanceId) => {
    try {
        const response = await api.get(`/inheritance/${inheritanceId}/solution`, )
        console.log(response.data)
        return response
    } catch (error) {
        throw error;
    }
}


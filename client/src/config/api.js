// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
  },
};

export default API_BASE_URL;


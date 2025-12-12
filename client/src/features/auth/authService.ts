import axios from 'axios';

const API_URL = 'http://localhost:7293/api/auth/';

const login = async (userData: any) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (userData: any) => {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const validateToken = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + 'validateToken', {}, config);
    response.status === 200 ? true : logout();
};

const authService = {
    login,
    register,
    logout,
    validateToken,
};

export default authService;

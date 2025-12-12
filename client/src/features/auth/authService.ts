import axios from 'axios';
import { environment } from '../../config/environment';

const API_URL = `${environment.API_URL}/api/auth/`;

interface UserData {
    username: string;
    password?: string;
    passwordHash?: string;
}

interface AuthResponse {
    id?: string;
    username?: string;
    token?: string;
}

const login = async (userData: UserData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (userData: UserData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(API_URL + 'register', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const validateToken = async (token: string): Promise<boolean> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + 'validateToken', {}, config);
    if (response.status === 200) {
        return true;
    } else {
        logout();
        return false;
    }
};

const authService = {
    login,
    register,
    logout,
    validateToken,
};

export default authService;

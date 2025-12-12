import axios from 'axios';
import { environment } from '../../config/environment';

const API_URL = `${environment.API_URL}/api/products/`;

interface Product {
    id: string;
    name: string;
    category?: string;
    price: number;
    isPublic?: boolean;
    userId?: string;
    user?: {
        username: string;
    };
}

const getProducts = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const createProduct = async (productData: Omit<Product, 'id'>, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL, productData, config);
    return response.data;
};

const deleteProduct = async (productId: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.delete(API_URL + productId, config);
    return response.data;
};

const updateProduct = async (productData: Product, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_URL + productData.id, productData, config);
    return response.data;
};

const productService = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default productService;
export type { Product };

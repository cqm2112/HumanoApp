import axios from 'axios';

const API_URL = 'http://localhost:7293/api/products/';

const getProducts = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

const createProduct = async (productData: any, token: string) => {
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

const updateProduct = async (productData: any, token: string) => {
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

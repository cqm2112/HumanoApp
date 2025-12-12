
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

interface ProductState {
    products: any[];
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const initialState: ProductState = {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI: any) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await productService.getProducts(token);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const createProduct = createAsyncThunk('products/create', async (productData: any, thunkAPI: any) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await productService.createProduct(productData, token);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProduct = createAsyncThunk('products/update', async (productData: any, thunkAPI: any) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await productService.updateProduct(productData, token);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id: string, thunkAPI: any) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        await productService.deleteProduct(id, token);
        return id;
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload.items ? action.payload.items : action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products.push(action.payload as never);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.products.findIndex((product: any) => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.products = state.products.filter((product: any) => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            });
    },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;

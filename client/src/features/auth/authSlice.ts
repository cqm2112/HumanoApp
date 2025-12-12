import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

interface User {
    id?: string;
    username?: string;
    token?: string;
}

interface AuthState {
    user: User | null;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}

const user = JSON.parse(localStorage.getItem('user') || 'null');

const initialState: AuthState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const login = createAsyncThunk('auth/login', async (user: { username: string; passwordHash: string }, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error: unknown) {
        const message = (error as { response?: { data?: { message?: string } }; message?: string }).response?.data?.message || (error as Error).message || String(error);
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk('auth/register', async (user: { username: string; passwordHash: string }, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error: unknown) {
        const message = (error as { response?: { data?: { message?: string } }; message?: string }).response?.data?.message || (error as Error).message || String(error);
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

export const validateToken = createAsyncThunk('auth/validateToken', async (token: string, thunkAPI) => {
    try {
        return await authService.validateToken(token);
    } catch (error: unknown) {
        const message = (error as { response?: { data?: { message?: string } }; message?: string }).response?.data?.message || (error as Error).message || String(error);
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(validateToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(validateToken.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(validateToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

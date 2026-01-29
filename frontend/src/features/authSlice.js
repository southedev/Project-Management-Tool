import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '@/service/api'

// sign up
export const signUp = createAsyncThunk('auth/signUp', async (data, thunkAPI) => {
    try {
        const response = await instance.post('/auth/register', data);

        // Extract user data from the response if available
        return response.data.user || response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

// sign in
export const signIn = createAsyncThunk('auth/signIn', async (data, thunkAPI) => {
    try {
        const response = await instance.post(
            '/auth/login', 
            data
        )

        // Extract user data from the response and include the token
        const { user, token } = response.data;
        const userData = { ...user, token };
        return userData
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')),
        loading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem('user'),
    },
    reducers: {
        logout(state) {
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem('user')
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signUp.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(signIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
    },
})

export default authSlice.reducer

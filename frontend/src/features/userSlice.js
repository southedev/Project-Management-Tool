import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// create user
export const createUser = createAsyncThunk(
  'createUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('https://6973ba06b5f46f8b5828218c.mockapi.io/users', data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// get all users
export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://6973ba06b5f46f8b5828218c.mockapi.io/users')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// delete user
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.delete(`https://6973ba06b5f46f8b5828218c.mockapi.io/users/${userId}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  'updateUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.patch(`https://6973ba06b5f46f8b5828218c.mockapi.io/users/${userData.id}`, userData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter((user) => user.id !== action.payload.id)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        )
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
});

export default userSlice.reducer

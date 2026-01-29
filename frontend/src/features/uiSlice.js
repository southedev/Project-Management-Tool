import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
    error: null,
    success: false,
    darkMode: false,
    lightMode: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
      state.lightMode = !action.payload
    },
  },
})

export default uiSlice.reducer

export const { setLoading, setError, setSuccess, setDarkMode } = uiSlice.actions

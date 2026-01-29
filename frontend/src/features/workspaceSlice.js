import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '@/service/api'

// create workspace
export const createWorkspace = createAsyncThunk(
  'workspace/createWorkspace',
  async (workspaceData, thunkAPI) => {
    try {
      const response = await instance.post('/workspaces/create', workspaceData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// get all workspaces
export const getUserWorkspaces = createAsyncThunk(
  'workspace/getUserWorkspaces',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get(
        '/workspaces'
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// delete workspace
// export const deleteWorkspace = createAsyncThunk(
//   'workspace/deleteWorkspace',
//   async (workspaceId, thunkAPI) => {
//     try {
//       const response = await instance.delete(`/workspaces/${workspaceId}`)
//       return response.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// );

// update workspace
// export const updateWorkspace = createAsyncThunk(
//   'workspace/updateWorkspace',
//   async (data, thunkAPI) => {
//     try {
//       const { workspaceId, ...updateData } = data;
//       const response = await instance.put(`/workspaces/${workspaceId}`, updateData)
//       return response.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// );

// get workspace by id
export const getWorkspaceDetails = createAsyncThunk(
  'workspace/getWorkspaceDetails',
  async (workspaceId, thunkAPI) => {
    try {
      const response = await instance.get(`/workspaces/${workspaceId}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

// Helper function to remove duplicates based on _id
const removeDuplicateWorkspaces = (workspaces) => {
  const seenIds = new Set();
  return workspaces.filter(workspace => {
    if (seenIds.has(workspace._id)) {
      return false;
    }
    seenIds.add(workspace._id);
    return true;
  });
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    workspaces: removeDuplicateWorkspaces(JSON.parse(localStorage.getItem('workspaces')) || []),
    loading: false,
    error: null,
  },
  reducers: {
    // setWorkspace: (state, action) => {
    //   state.workspaces = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWorkspace.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.loading = false
        // The backend returns { workspace, message }, so we need to access action.payload.workspace
        const newWorkspace = action.payload.workspace;
        // Check if workspace already exists to prevent duplicates
        const existingIndex = state.workspaces.findIndex(workspace => workspace._id === newWorkspace._id);
        if (existingIndex === -1) {
          // Only add if it doesn't already exist
          state.workspaces = [...state.workspaces, newWorkspace];
        } else {
          // If it exists, update it
          state.workspaces[existingIndex] = newWorkspace;
        }
        localStorage.setItem('workspaces', JSON.stringify(state.workspaces))
      })
      .addCase(createWorkspace.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getUserWorkspaces.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserWorkspaces.fulfilled, (state, action) => {
        state.loading = false
        // Remove duplicates from the fetched workspaces
        state.workspaces = removeDuplicateWorkspaces(action.payload)
        localStorage.setItem('workspaces', JSON.stringify(state.workspaces))
      })
      .addCase(getUserWorkspaces.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getWorkspaceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkspaceDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Check if workspace already exists in the array to prevent duplicates
        const existingIndex = state.workspaces.findIndex(workspace => workspace._id === action.payload._id);
        if (existingIndex !== -1) {
          // Update the existing workspace
          state.workspaces[existingIndex] = action.payload;
        } else {
          // Add the workspace to the array if it doesn't exist
          state.workspaces = [action.payload, ...state.workspaces];
        }
        localStorage.setItem('workspaces', JSON.stringify(state.workspaces))
      })
      .addCase(getWorkspaceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setWorkspace } = workspaceSlice.actions
export default workspaceSlice.reducer

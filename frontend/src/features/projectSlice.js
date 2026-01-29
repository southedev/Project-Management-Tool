// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import instance from '@/service/api'

// // create workspace
// export const createWorkspace = createAsyncThunk(
//   'project/createProject',
//   async (projectData, thunkAPI) => {
//     try {
//       const response = await instance.post('/projects/create', projectData)
//       return response.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// );

// // get all workspaces
// export const getUserWorkspaces = createAsyncThunk(
//   'project/getUserProjects',
//   async (_, thunkAPI) => {
//     try {
//       const response = await instance.get(
//         '/projects'
//       )
//       return response.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// );

// // delete project
// // export const deleteWorkspace = createAsyncThunk(
// //   'project/deleteProject',
// //   async (workspaceId, thunkAPI) => {
// //     try {
// //       const response = await instance.delete(`/workspaces/${workspaceId}`)
// //       return response.data
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message)
// //     }
// //   }
// // );

// // update project
// // export const updateProject = createAsyncThunk(
// //   'project/updateProject',
// //   async (data, thunkAPI) => {
// //     try {
// //       const { workspaceId, ...updateData } = data;
// //       const response = await instance.put(`/workspaces/${workspaceId}`, updateData)
// //       return response.data
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message)
// //     }
// //   }
// // );

// // get workspace by id
// export const getProjectDetails = createAsyncThunk(
//   'project/getProjectDetails',
//   async (projectId, thunkAPI) => {
//     try {
//       const response = await instance.get(`/projects/${projectId}`)
//       return response.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message)
//     }
//   }
// );

// export const projectSlice = createSlice({
//   name: 'project',
//   initialState: {
//     projects: JSON.parse(localStorage.getItem('projects')) || [],
//     loading: false,
//     error: null,
//   },
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProject.pending, (state) => {
   
//       })
//       .addCase(createProject.fulfilled, (state, action) => {
       
//       })
//       .addCase(createProject.rejected, (state, action) => {
        
//       })
//       .addCase(getUserProjects.pending, (state) => {
        
//       })
//       .addCase(getUserProjects.fulfilled, (state, action) => {
        
//       })
//       .addCase(getUserProjects.rejected, (state, action) => {
       
//       })
//       // .addCase(deleteWorkspace.pending, (state) => {
//       //   state.loading = true
//       //   state.error = null
//       // })
//       // .addCase(deleteWorkspace.fulfilled, (state, action) => {
//       //   state.loading = false
//       //   // Handle consistent ID field (_id from backend)
//       //   const workspaceIdToDelete = action.payload.workspace ? action.payload.workspace._id : action.payload._id;
//       //   state.workspaces = state.workspaces.filter(
//       //     (workspace) => workspace._id !== workspaceIdToDelete
//       //   )
//       //   localStorage.setItem('workspaces', JSON.stringify(state.workspaces))
//       // })
//       // .addCase(deleteWorkspace.rejected, (state, action) => {
//       //   state.loading = false
//       //   state.error = action.payload
//       // })
//       // .addCase(updateWorkspace.pending, (state) => {
//       //   state.loading = true;
//       //   state.error = null;
//       // })
//       // .addCase(updateWorkspace.fulfilled, (state, action) => {
//       //   // Update the workspace in the state with consistent ID handling
//       //   const updatedWorkspace = action.payload.workspace || action.payload;
//       //   const updatedIndex = state.workspaces.findIndex(workspace => workspace._id === updatedWorkspace._id);
//       //   if (updatedIndex !== -1) {
//       //     state.workspaces[updatedIndex] = updatedWorkspace;
//       //     localStorage.setItem('workspaces', JSON.stringify(state.workspaces))
//       //   }
//       //   state.loading = false;
//       // })
//       // .addCase(updateWorkspace.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload;
//       // })
//       .addCase(getProjectDetails.pending, (state) => {
        
//       })
//       .addCase(getProjectDetails.fulfilled, (state, action) => {
       
//       })
//       .addCase(getProjectDetails.rejected, (state, action) => {
        
//       })
//   },
// });



// export default projectSlice.reducer

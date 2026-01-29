import { userSlice } from '@/features/userSlice'
import { workspaceSlice } from '@/features/workspaceSlice'
import { authSlice } from '@/features/authSlice'
import { uiSlice } from '@/features/uiSlice'

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    workspace: workspaceSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
  },
})

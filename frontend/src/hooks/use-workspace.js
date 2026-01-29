import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createWorkspace, getWorkspaceDetails } from '../features/workspaceSlice'
import { useEffect } from 'react'

export const useCreateWorkspace = () => {
  const dispatch = useDispatch()

  return { createWorkspace: (data) => dispatch(createWorkspace(data)) }

}

export const useGetUserWorkspaces = () => {
  const { workspaces, loading } = useSelector((state) => state.workspace)

  return { workspaces, loading }
}

// export const useGetWorkspace = (workspaceId) => {
//   const { workspaces, loading } = useSelector((state) => state.workspace)
//   const workspace = workspaces.find((w) => w._id === workspaceId)

//   return { workspace, loading }
// }

export const useGetUserWorkspace = (workspaceId) => {
  const { workspaces, loading } = useSelector((state) => state.workspace)
  const workspace = workspaces.find((w) => w._id === workspaceId)

  return { workspace, loading }
}

export const useGetWorkspaceDetails = (workspaceId) => {
  const dispatch = useDispatch()
  const { workspaces, loading } = useSelector((state) => state.workspace)
  const workspace = workspaces.find((w) => w._id === workspaceId)

  useEffect(() => {
    if (workspaceId && !workspace) {
      dispatch(getWorkspaceDetails(workspaceId))
    }
  }, [workspaceId, workspace, dispatch])

  return { workspace, loading }
}
import { useSelector } from 'react-redux'
import { createProject } from '../features/projectSlice'
import { useDispatch } from 'react-redux'


export const useCreateProject = (data) => {
    const dispatch = useDispatch()
    return dispatch(createProject(data))
}

export const useGetProjects = () => {
    const { projects, loading } = useSelector((state) => state.workspace)

    return { projects, loading }
}

export const useGetProject = (projectId) => {
    const { projects } = useSelector((state) => state.workspace)
    const project = projects.find((p) => p._id === projectId)

    return { project }
}

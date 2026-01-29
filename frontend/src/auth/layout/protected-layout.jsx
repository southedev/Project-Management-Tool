import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}

export default ProtectedLayout

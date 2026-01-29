import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import Spinner from '@/components/Spinner'

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <Spinner />

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Outlet />
    </div>
  )
}

export default AuthLayout

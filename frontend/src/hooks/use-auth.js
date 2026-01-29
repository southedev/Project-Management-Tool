import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { user, token, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  )

  return { user, token, isAuthenticated, loading }
}

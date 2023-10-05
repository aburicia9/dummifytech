import { createContext, useEffect, useState } from 'react'
import { createUserService, getInfoOwnerUserService, loginUserService } from '../services/authService'
import { getToken } from '../utils/getToken'
import { useNavigate } from 'react-router-dom'
import { TOKEN_LOCAL_STORAGE_KEY } from '../utils/constants'
// import { useError } from '../hooks/useError'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  // const { setErrorMsg } = useError()

  const [authUser, setAuthUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)

        const body = await getInfoOwnerUserService()

        if (body.status === 'error') {
          throw new Error(body.message)
        }

        setAuthUser(body.data.user)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    const token = getToken()

    if (token) fetchUser()
  }, [isAuthenticated])

  const authRegister = async (username, email, password, fullName, reapeatPassword) => {
    try {
      setLoading(true)

      if (password !== reapeatPassword) {
        throw new Error('las contraseñas no coinciden')
      }

      const body = await createUserService(username, email, password, fullName)

      if (body.status === 'error') {
        throw new Error(body.message)
      }

      navigate('/login')
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const authLogin = async (email, password) => {
    try {
      setLoading(true)

      const body = await loginUserService(email, password)

      if (body.status === 'error') {
        throw new Error(body.message)
      }

      window.localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, body.data.token)

      setIsAuthenticated(true)
      return body
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const authLogout = () => {
    window.localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY)

    setAuthUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authUser, authRegister, authLogin, authLogout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

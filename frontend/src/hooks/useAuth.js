// Importamos los hooks.
import { useContext } from 'react'

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext'

export const useAuth = () => {
  return useContext(AuthContext)
}

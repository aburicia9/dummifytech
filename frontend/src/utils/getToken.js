import { TOKEN_LOCAL_STORAGE_KEY } from './constants'

export const getToken = () => {
  const authToken = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
  return authToken || null
}

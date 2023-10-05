import { TOKEN_LOCAL_STORAGE_KEY } from './constants'

export const getToken = () => {
  const authToken = window.localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
  return authToken || null
}

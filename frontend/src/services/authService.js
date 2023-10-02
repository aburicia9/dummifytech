import { getToken } from '../utils/getToken'

const baseApiURL = import.meta.env.VITE_API_URL

// USER ADMIN
// Listamos todos los usuarios
export const listAllUsersService = async () => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/users`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Borramos a un usuario
export const deleteUserService = async (userId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/users/${userId}`, {
    method: 'delete',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Para registrar un usuario
export const signUpService = async ({ username, email, password, fullName }) => {
  const res = await fetch(`${baseApiURL}/register`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password,
      fullName
    })
  })
  const body = await res.json()
  return body
}

// Login
export const singInService = async ({ email, password }) => {
  const res = await fetch(`${baseApiURL}/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  const body = await res.json()
  return body
}

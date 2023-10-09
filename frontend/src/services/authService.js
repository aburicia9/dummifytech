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
export const createUserService = async ({ username, email, password, fullName }) => {
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
export const loginUserService = async ({ email, password }) => {
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

// Ver mi propio perfil
export const getInfoOwnerUserService = async () => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/users/profile`, {
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Modificamos el avatar
export const updateAvatarUserService = async (formData) => {
  const token = getToken()

  const res = await fetch(`${baseApiURL}/users/profile/avatar`, {
    method: 'put',
    headers: {
      Authorization: token
    },
    body: formData
  })
  const body = await res.json()
  return body
}

// Modificamos la contraseña
export const updatePasswordUserService = async (oldPassword, newPassword, comparePassword) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/users/profile/password`, {
    method: 'put',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
      comparePassword
    })
  })
  const body = await res.json()
  return body
}

// Modificamos el nombre completo
export const updateFullNameUserService = async (fullName) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/users/profile/fullname`, {
    method: 'put',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName
    })
  })
  const body = await res.json()
  return body
}

// Borramos nuestro usuario
export const deleteOwnUserService = async () => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/users/profile`, {
    method: 'delete',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Verificamos nuestra cuenta
export const verificationOwnUserService = async (token) => {
  const res = await fetch(`${baseApiURL}/confirm/${token}`)
  const body = await res.json()
  return body
}

// Enviar una contraseña nueva
export const updateForgetPasswordUserService = async ({ username, email }) => {
  const res = await fetch(`${baseApiURL}/recovery-password`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email
    })
  })
  const body = await res.json()
  return body
}

// Visualizar todos mis posts
export const listAllOwnerPostsService = async () => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/users/myposts`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

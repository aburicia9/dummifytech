import { getToken } from '../utils/getToken'

const baseApiURL = import.meta.env.VITE_API_URL

// Creamos una categoria
export const createCategoryService = async (categoryParentId, name, description) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/categories/insert`, {
    method: 'post',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: {
      categoryParentId,
      name,
      description
    }
  })
  const body = await res.json()
  return body
}

// Listamos las categorias
export const listCategoriesService = async () => {
  const res = await fetch(`${baseApiURL}/categories`)
  const body = await res.json()
  return body
}

// Cambiamos una categoria
export const updateCategoryService = async (categoryId, name, description) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/categories/${categoryId}`, {
    method: 'put',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: {
      name,
      description
    }
  })
  const body = await res.json()
  return body
}

// Borramos una categoria
export const deleteCategoryService = async (categoryId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/categories/${categoryId}`, {
    method: 'delete',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Creamos una request para una categoria nueva
export const createReqCategoryService = async (categoryName, categoryReason, categoryParentId) => {
  const token = getToken()

  categoryParentId = Number(categoryParentId)
  const res = await fetch(`${baseApiURL}/categories/request`, {
    method: 'post',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      categoryName,
      categoryReason,
      categoryParentId
    })
  })
  const body = await res.json()
  return body
}

// Listamos todas las peticiones de nuevas categorias
export const listReqCategoriesService = async () => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/categories/request`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Cambiamos el estado de una peticion de categoria nueva
export const updateReqCategoryService = async (requestCategoryId, statusReq, accepted) => {
  const token = getToken()
  console.log(requestCategoryId, statusReq, accepted)
  const res = await fetch(`${baseApiURL}/categories/request`, {
    method: 'put',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requestCategoryId,
      statusReq,
      accepted
    })
  })
  const body = await res.json()
  return body
}

// Listamos todas las categorias por id
export const listAllCategoriesByIdService = async (categoryId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/categories/${categoryId}`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

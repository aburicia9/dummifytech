const baseApiURL = import.meta.env.VITE_API_URL

export const listCategoriesService = async () => {
  const res = await fetch(`${baseApiURL}/categories`)
  const body = await res.json()
  return body
}

export const updateCategoryService = async (categoryId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/categories/${categoryId}`, {
    method: 'put',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

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

export const updateReqCategoryService = async (requestcategoryId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/categories/request/${requestcategoryId}`, {
    method: 'put',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

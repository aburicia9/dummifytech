import { getToken } from '../utils/getToken'

const baseApiURL = import.meta.env.VITE_API_URL

// Crear un post
export const createPostService = async (formData) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/insert`, {
    method: 'post',
    headers: {
      Authorization: token
    },
    body: formData
  })
  const body = await res.json()
  return body
}

// Coger un posts random
export const getRandomPostService = async () => {
  const res = await fetch(`${baseApiURL}/`)
  const body = await res.json()
  return body
}

// Listar todos los posts
export const listAllPostsService = async (searchParams) => {
  const token = getToken()

  const res = await fetch(`${baseApiURL}/posts?${searchParams}`, {
    headers: token ? { Authorization: token } : {}
  })
  const body = await res.json
  return body
}

// Crear o eliminar like en un post
export const likePostService = async (postId, method) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}/likes`, {
    method,
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Crear o eliminar dislike en un post
export const dislikePostService = async (postId, method) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}/dislikes`, {
    method,
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Eliminar un post
export const deletePostService = async (postId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}`, {
    method: 'delete',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Modificamos un post
export const updatePostService = async (postId, formData) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}`, {
    method: 'put',
    headers: {
      Authorization: token
    },
    body: formData
  })
  const body = await res.json()
  return body
}

// Crear o eliminar report en un post
export const reportPostService = async (postId, method) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}/report`, {
    method,
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Crear o eliminar report en un post
export const listReportPostService = async () => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/report`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

// Crear un comentario en un post
export const createCommentPostService = async (postId, comment) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}/comments`, {
    method: 'post',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment
    })
  })
  const body = await res.json()
  return body
}
// Listamos comentarios de post
export const listCommentsPostService = async (postId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}/comments`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

export const updateCommentPostService = async (postId, commentId, comment) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}/comments/${commentId}`, {
    method: 'put',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment
    })
  })
  const body = await res.json()
  return body
}

export const deleteCommentPostService = async (postId, commentId) => {
  const token = getToken()
  const res = await fetch(`${baseApiURL}/posts/${postId}/comments/${commentId}`, {
    method: 'delete',
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

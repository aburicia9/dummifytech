import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import { listAllPostsService } from '../services/postService'

export const usePosts = () => {
  const [posts, setPosts] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Realizamos una peticion para obtener los posts
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const body = await listAllPostsService()

        setPosts(body.data.posts)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    // Llamamos a la funcion anterior
    fetchPosts()
  }, [searchParams])

  // Funcion que permite agregar o eliminar un like
  const likePostById = (postId) => {
    // Obtenemos un nuevo array donde modificamos exclusivamente el post en cuestion
    const newPosts = posts.map((currentPost) => {
      // Si el id del post actual coincide con el post del id sobre el que queremos agregar o eliminar el like lo modificamos
      if (currentPost.id === postId) {
        // Invertimos el valor de ownerLikes
        const ownerLikes = !currentPost.ownerLikes
        // Incrementamos o decrementamos los likes en 1 en funcion del valor de ownerLikes
        const likes = ownerLikes
          ? currentPost.countLikes + 1
          : currentPost.countLikes - 1

        return {
          ...currentPost,
          ownerLikes,
          likes
        }
      }
      // Retornamos el post
      return currentPost
    })
    // Actualizamos los tweets con el nuevo array
    setPosts(newPosts)
  }

  // Funcion que permite agregar o eliminar un dislike
  const dislikePostById = (postId) => {
    // Obtenemos un nuevo array donde modificamos exclusivamente el post en cuestion
    const newPosts = posts.map((currentPost) => {
      // Si el id del post actual coincide con el post del id sobre el que queremos agregar o eliminar el like lo modificamos
      if (currentPost.id === postId) {
        // Invertimos el valor de ownerLikes
        const ownerdisLikes = !currentPost.ownerdisLikes
        // Incrementamos o decrementamos los likes en 1 en funcion del valor de ownerLikes
        const dislikes = ownerDislikes
          ? currentPost.countDislikes + 1
          : currentPost.countDislikes - 1

        return {
          ...currentPost,
          ownerdisLikes,
          dislikes
        }
      }
      // Retornamos el post
      return currentPost
    })
    // Actualizamos los tweets con el nuevo array
    setPosts(newPosts)
  }

  // Funcion que permite eliminar un post
  const deletePostById = (postId) => {
    // Creamos un nuevo array en el que eliminamos unicamente el post
    const newPosts = posts.filter(
      (currentPost) => currentPost.id !== postId
    )

    // Actualizamos los posts
    setPosts(newPosts)
  }
}

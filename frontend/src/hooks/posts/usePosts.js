import { useEffect, useState } from 'react'
import { getRandomPostService, listAllPostsService } from '../../services/postService'
import { useAuth } from '../useAuthHook'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        let body = []
        if (!isAuthenticated) {
          body = await getRandomPostService()
        } else {
          body = await listAllPostsService()
        }
        console.log(isAuthenticated)

        setPosts(body.data.posts)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [isAuthenticated])

  return {
    posts
  }
}

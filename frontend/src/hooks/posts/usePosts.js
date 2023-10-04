import { useEffect, useState } from 'react'
import { getRandomPostService } from '../../services/postService'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const body = await getRandomPostService()
        setPosts(body.data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return {
    posts
  }
}

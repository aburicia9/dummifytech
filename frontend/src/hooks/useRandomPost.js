import { useEffect, useState } from 'react'
import { getRandomPostService } from '../services/postService'

export const useRandomPost = () => {
  const [randomPosts, setRandomPost] = useState([])

  useEffect(() => {
    const fetchRandomPost = async () => {
      try {
        const { data } = await getRandomPostService()

        setRandomPost(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchRandomPost()
  }, [])
  return randomPosts
}

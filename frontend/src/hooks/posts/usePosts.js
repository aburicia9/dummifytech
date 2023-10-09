import { useEffect, useState } from 'react'
import { getRandomPostService, listAllPostsService, listPostByIdCategoryService } from '../../services/postService'
import { useAuth } from '../useAuth'
import { useParams, useSearchParams } from 'react-router-dom'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()
  const params = useParams()
  const categoryId = params?.categoryId
  const [searchParams, setSearchParams] = useSearchParams()

  const fetchPosts = async () => {
    try {
      setLoading(true)

      let body = []

      if (!isAuthenticated) {
        body = await getRandomPostService()
      } else {
        if (categoryId) {
          body = await listPostByIdCategoryService(categoryId, searchParams)
        } else {
          body = await listAllPostsService(searchParams)
        }
      }

      setPosts(body.data.posts)
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [isAuthenticated, params, searchParams])

  return {
    posts,
    setSearchParams,
    fetchPosts,
    categoryId
  }
}

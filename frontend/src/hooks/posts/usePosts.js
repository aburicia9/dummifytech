import { useEffect, useState } from 'react'
import { getRandomPostService, listAllPostsService, listPostByIdCategoryService } from '../../services/postService'
import { useAuth } from '../useAuth'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { listAllOwnerPostsService } from '../../services/authService'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()
  const params = useParams()
  const categoryId = params?.categoryId
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const fetchPosts = async () => {
    try {
      setLoading(true)

      let body = [].pathname

      if (location.pathname === '/users/myposts') {
        body = await listAllOwnerPostsService()
        return setPosts(body.data.posts)
      }

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

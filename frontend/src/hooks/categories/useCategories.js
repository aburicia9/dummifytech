import { useEffect, useState } from 'react'
import { listCategoriesService } from '../../services/categoryService'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const body = await listCategoriesService()

        setCategories(body.data.categories)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return {
    categories
  }
}

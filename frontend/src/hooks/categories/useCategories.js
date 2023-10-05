import { useEffect, useState } from 'react'
import { listCategoriesService } from '../../services/categoryService'

export const useCategories = () => {
  const [categories, setCategories] = useState(
    JSON.parse(window.localStorage.getItem('categories') || '[]')
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)

        const body = await listCategoriesService()

        const cachedCountCategories = JSON.parse(window.localStorage.getItem('countCategories') || '1')

        if (body.data.countCategories === cachedCountCategories) {
          return
        }

        window.localStorage.setItem('categories', JSON.stringify(body.data.categories))
        window.localStorage.setItem('countCategories', JSON.stringify(body.data.countCategories))

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

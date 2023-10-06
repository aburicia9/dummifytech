import './TitleCategory.css'

import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { listAllCategoriesByIdService } from '../../services/categoryService'

export const TitleCategory = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [titleCategory, setTitleCategory] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)

        const body = await listAllCategoriesByIdService(params.categoryId)

        if (body.data.categories[0]) {
          setTitleCategory(body.data.categories[0].name)
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
    return () => {
      setTitleCategory('')
    }
  }, [params])
  return (
    <h2 className='title-category'>{titleCategory}</h2>

  )
}

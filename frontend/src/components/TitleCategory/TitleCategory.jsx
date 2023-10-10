import './TitleCategory.css'

import { useLocation, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { listAllCategoriesByIdService } from '../../services/categoryService'

export const TitleCategory = () => {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const location = useLocation()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        if (location.pathname === '/users/myposts') {
          return setTitle('Mis publicaciones')
        }
        if (location.pathname === '/') {
          return setTitle('Publicaciones')
        }
        if (location.pathname === '/users') {
          return setTitle('Usuarios')
        }
        if (location.pathname === '/categories/request') {
          return setTitle('Peticiones de categorias')
        }
        if (location.pathname === '/reports') {
          return setTitle('Publicaciones reportadas')
        }
        if (location.pathname === '/users/profile') {
          return setTitle('Mi perfil')
        }
        const body = await listAllCategoriesByIdService(params.categoryId)

        if (body.data.categories[0]) {
          setTitle(body.data.categories[0].name)
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
    return () => {
      setTitle('')
    }
  }, [params])
  return (
    <h2 className='title-category'>{title}</h2>

  )
}

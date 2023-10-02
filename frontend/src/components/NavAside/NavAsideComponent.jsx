import { useEffect, useState } from 'react'
import { listCategoriesService } from '../../services/categoryService'
import './NavAsideComponent.css'

export const NavAsideComponent = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const { data } = await listCategoriesService()

        setCategories(data.categories)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <aside className='nav-aside'>
      <h2 className='nav-title'>CATEGORIAS</h2>
      <ul className='categories-list'>
        {
        categories.map((category) => {
          return (
            <li key={category.id} className='nav-li-category'>{category.name}</li>
          )
        })
        }
      </ul>
    </aside>
  )
}

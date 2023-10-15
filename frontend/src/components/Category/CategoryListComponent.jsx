import './CategoryListComponent.css'
import { useState, useEffect } from 'react'
import { ButtonCategoryComponent } from '../Button/ButtonCategoryComponent'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo/logo.png'
import { useAuth } from '../../hooks/useAuth'
import { toastifyError } from '../../utils/Toastify/Toastify'
import { useCategories } from '../../hooks/categories/useCategories'

export const CategoryListComponent = () => {
  const { categories } = useCategories()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [categoryIdOpened, setCategoryIdOpened] = useState(-1)

  const handleOnClickHome = () => {
    navigate('/')
  }

  return (
    <aside className='aside-category-list'>
      <img
        className='img-logo-category'
        src={logo}
        alt='Logo dummifytech'
        onClick={handleOnClickHome}
      />
      <h3 className='h3-category'>Categorias</h3>
      <ul className='ul-category-list'>
        {categories.map((category) => {
          return (
            <Category
              category={category}
              key={category.id}
              isSubcategoryDisabled={!isAuthenticated}
              categoryIdOpened={categoryIdOpened}
              setCategoryIdOpened={setCategoryIdOpened}
            />
          )
        })}
      </ul>
    </aside>
  )
}

export function Category ({ category, isSubcategoryDisabled, categoryIdOpened, setCategoryIdOpened }) {
  const { id, name, subcategories } = category
  const [toggle, setToggle] = useState(false)

  const handleOnClick = () => {
    if (toggle === true) {
      setToggle(false)
    }

    if (toggle === false) {
      if (isSubcategoryDisabled) {
        toastifyError('Debes iniciar sesion para poder navegar')
      }
      setCategoryIdOpened(id)
      setToggle(true)
    }
  }
  useEffect(() => {
    if (categoryIdOpened !== id && toggle) {
      setToggle(false)
    }
  }, [categoryIdOpened])

  return (
    <li key={id} className='li-category'>
      <ButtonCategoryComponent
        onClick={handleOnClick}
        buttonName={name}
        showHide={toggle}
      />
      {toggle && (
        <ul style={{
          overflowY: 'auto'
        }}
        >
          {subcategories.map((subcategory) => {
            return (
              <li key={subcategory.id} className='li-subcategory-category'>
                <Link
                  to={`/posts/categories/${subcategory.id}`}
                  className={`a-subcategory-category ${
                    isSubcategoryDisabled ? 'disabled' : ''
                  }`}
                >
                  {subcategory.name}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

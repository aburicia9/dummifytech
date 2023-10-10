import './CategoryListComponent.css'
import { useState } from 'react'
import { ButtonCategoryComponent } from '../Button/ButtonCategoryComponent'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo/logo.png'
import { useAuth } from '../../hooks/useAuth'
import { toastifyError } from '../../utils/Toastify/Toastify'

export const CategoryListComponent = ({
  categories,
  isSubcategoryDisabled
}) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
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
            />
          )
        })}
      </ul>
    </aside>
  )
}

export function Category ({ category, isSubcategoryDisabled }) {
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
      setToggle(true)
    }
  }

  return (
    <li key={id} className='li-category'>
      <ButtonCategoryComponent
        onClick={handleOnClick}
        buttonName={name}
        showHide={toggle}
      />
      {toggle && (
        <>
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
        </>
      )}
    </li>
  )
}

import { useState } from 'react'
import './CategoryListComponent.css'
import { ButtonCategoryComponent } from '../Button/ButtonCategoryComponent'
import { Link } from 'react-router-dom'

export const CategoryListComponent = ({ categories, isSubcategoryDisabled }) => {
  return (
    <aside className='aside-category-list'>
      <h3 className='h3-category'>Categorias</h3>
      <ul className='ul-category-list'>
        {categories.map((category) => {
          return <Category category={category} key={category.id} isSubcategoryDisabled={isSubcategoryDisabled} />
        })}
      </ul>
    </aside>

  )
}

function Category ({ category, isSubcategoryDisabled }) {
  const { id, name, subcategories } = category
  const [toggle, setToggle] = useState(false)
  const [className, setClassName] = useState('buttonCategory-generic-')

  function handleOnClick () {
    if (toggle === true) {
      setClassName('buttonCategory-generic-')
      setToggle(false)
    }
    if (toggle === false) {
      setClassName('buttonCategory-generic-hover')
      setToggle(true)
    }
  }
  return (
    <li key={id} className='li-category'>
      <ButtonCategoryComponent className={className} onClick={handleOnClick} buttonName={name} />
      {toggle && (
        <ul>
          {
        subcategories.map((subcategory) => {
          return (
            <li key={subcategory.id} className='li-subcategory-category'>
              <Link to={`/posts?keyword=${subcategory.id}`} className={`a-subcategory-category ${isSubcategoryDisabled ? 'disabled' : ''}`}>{subcategory.name}</Link>
            </li>
          )
        })
      }
        </ul>
      )}
    </li>
  )
}

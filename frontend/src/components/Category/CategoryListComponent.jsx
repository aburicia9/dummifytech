import { useState } from 'react'
import './CategoryListComponent.css'
import { ButtonCategoryComponent } from '../Button/ButtonCategoryComponent'

export const CategoryListComponent = ({ categories }) => {
  return (
    <aside className='aside-category-list'>
      <h3 className='h3-category'>Categorias</h3>
      <ul className='ul-category-list'>
        {categories.map((category) => {
          return <Category category={category} key={category.id} />
        })}
      </ul>
    </aside>

  )
}

function Category ({ category }) {
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
        subcategories.map((subcategory) => {
          return (
            <li key={subcategory.id} className='li-subcategory-category'>
              <a href={`/posts?keyword=${subcategory.id}`} className='a-subcategory-category'>{subcategory.name}</a>
            </li>
          )
        })
      )}
    </li>
  )
}

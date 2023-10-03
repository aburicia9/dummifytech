import { useState } from 'react'
import './CategoryListComponent.css'

export const CategoryListComponent = ({ categories }) => {
  return (
    <ul>
      {categories.map((category) => {
        return <Category category={category} key={category.id} />
      })}
    </ul>
  )
}

function Category ({ category }) {
  const { id, name, subcategories } = category
  const [toggle, setToggle] = useState(false)
  function handleOnClick () {
    if (toggle === true) {
      setToggle(false)
    }
    if (toggle === false) {
      setToggle(true)
    }
  }
  return (
    <li key={id} className='home-page-categoryParent-li'>
      <button onClick={handleOnClick}>{name}</button>
      {toggle && (
        subcategories.map((subcategory) => {
          return (
            <li key={subcategory.id} className='home-page-subcategory-li'>
              <a href={`/posts?keyword=${subcategory.name}`}>{subcategory.name}</a>
            </li>
          )
        })
      )}
    </li>
  )
}

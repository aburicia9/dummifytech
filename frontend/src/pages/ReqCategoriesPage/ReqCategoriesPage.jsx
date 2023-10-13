import './ReqCategoriesPage.css'
import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import { Layout } from '../../components/Layout/Layout'
import { useState } from 'react'
import { toastifyForm } from '../../utils/Toastify/Toastify'
import { useCategories } from '../../hooks/categories/useCategories'
import { createReqCategoryService } from '../../services/categoryService'

export const ReqCategoriesPage = () => {
  const navigate = useNavigate()
  const [categoryName, setTitle] = useState('')
  const [categoryReason, setPost] = useState('')

  const [categoryParentId, setCategoryParentId] = useState()
  const [loading, setLoading] = useState(false)
  const { categories } = useCategories()

  const handleOnChangeCategoryName = (event) => {
    setTitle(event.target.value)
  }
  const handleOnChangeCategoryReason = (event) => {
    setPost(event.target.value)
  }
  const handleOnChangeCategory = (event) => {
    setCategoryParentId(event.target.value)
  }

  const handleOnClickCreatePost = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const body = await createReqCategoryService(categoryName, categoryReason, categoryParentId)

      if (body.status === 'error') {
        return toastifyForm(body)
      }

      toastifyForm(body)
      navigate('/')
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className='div-create-post'>
        <form className='form-create-post'>
          <div className='h2-div'>
            <h2 className='title-create-post'>Peticion de categoria</h2>
          </div>
          <label htmlFor='title' className='label-post-create'>
            Nombre de la categoria:
          </label>
          <input
            type='text'
            id='categoryName'
            className='input-post-create'
            onChange={handleOnChangeCategoryName}
            value={categoryName}
          />
          <label htmlFor='text' className='label-post-create'>
            Razon para crear la categoria:
          </label>
          <textarea
            id='text'
            cols='30'
            rows='10'
            className='input-post-create-txt'
            onChange={handleOnChangeCategoryReason}
            value={categoryReason}
          />
          <div className='button-position'>
            <section className='category-menu'>

              <select
                id='categorias'
                className='category-menu-select'
                onChange={handleOnChangeCategory}
                value={categoryParentId}
              >
                <option
                  className='option-subcategory'
                  value=''
                >Seleccion la categoria
                </option>
                {categories.map((category) => {
                  return (
                    <option
                      label={category.name}
                      className='option-category'
                      value={category.id}
                      key={category.id}
                    />
                  )
                })}
              </select>
            </section>

            <div className='button-create-post'>
              <ButtonComponent
                className='button-generic large'
                buttonName='Petición Categoria'
                handleOnClick={handleOnClickCreatePost}
              />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

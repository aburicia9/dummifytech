import { useNavigate, useParams } from 'react-router-dom'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import { Layout } from '../../components/Layout/Layout'
import './CreatePostPage.css'
import image from '../../assets/post/image_logo.svg'
import { createPostService } from '../../services/postService'
import { useRef, useState } from 'react'
import { toastifyError } from '../../utils/Toastify/Toastify'
import { handleAddFilePreview } from '../../utils/handleAddFilePreview'
import { handleRemoveFilePreview } from '../../utils/handleRemoveFilePreview'
import { useCategories } from '../../hooks/categories/useCategories'

export const CreatePostPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const params = useParams()
  const [categoryId, setCategoryId] = useState(params?.categoryId ?? '')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { categories } = useCategories()

  const handleOnChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleOnChangeText = (event) => {
    setPost(event.target.value)
  }
  const handleOnChangeCategory = (event) => {
    setCategoryId(Number(event.target.value))
  }

  const handleOnChangeAddFile = (event) => {
    handleAddFilePreview(event, setFile, setPreviewUrl)
  }
  const handleOnChangeRemoveFile = (event) => {
    handleRemoveFilePreview(fileInputRef, setFile, setPreviewUrl)
  }

  const handleOnClickCreatePost = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('title', title)
      formData.append('post', post)
      formData.append('categoryId', categoryId)
      if (file) formData.append('imgName', file)

      const body = await createPostService(formData)

      if (title === '') {
        toastifyError('El titulo es obligatorio')
      }
      if (post === '') {
        toastifyError('La publicación es obligatoria')
      }
      if (!categoryId) {
        toastifyError('Y la categoria?...')
      }

      if (body.status === 'error') {
        throw new Error(body.message)
      }

      navigate('/')
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className='div-create-post'>
        <form className='form-create-post'>
          <div className='h2-div'>
            <h2 className='title-create-post'>Crea tu post</h2>
          </div>
          <label htmlFor='title' className='label-post-create'>
            Titulo del post:
          </label>
          <input
            type='text'
            id='title'
            className='input-post-create'
            onChange={handleOnChangeTitle}
            value={title}
          />
          <label htmlFor='text' className='label-post-create'>
            Publicacion:
          </label>
          <textarea
            id='text'
            cols='30'
            rows='10'
            className='input-post-create-txt'
            onChange={handleOnChangeText}
            value={post}
          />
          <div className='button-position'>
            <section className='category-menu'>
              <select
                id='categorias'
                className='category-menu-select'
                onChange={handleOnChangeCategory}
                value={categoryId}
              >
                <option
                  className='option-subcategory'
                  value=''
                >Seleccion la categoria
                </option>
                {categories.map((category) => {
                  const subcategories = category.subcategories || []
                  return (
                    <optgroup
                      label={category.name}
                      className='option-category'
                      value={category.id}
                      key={category.id}
                    >
                      {subcategories.map((subCategory) => {
                        return (
                          <option
                            className='option-subcategory'
                            value={subCategory.id}
                            key={subCategory.id}
                          >
                            {subCategory.name}
                          </option>
                        )
                      })}
                    </optgroup>
                  )
                })}
              </select>
            </section>

            <label htmlFor='file-input' className='custom-file-label'>
              <span>Adjuntar imagen</span>
              <img
                className='icon-image'
                src={image}
                alt='adjuntar imagen icono'
              />
            </label>

            <input
              className='input-file'
              type='file'
              id='file-input'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleOnChangeAddFile}
            />

            <div className='button-create-post'>
              <ButtonComponent
                className='button-generic large'
                buttonName='Crear Post'
                handleOnClick={handleOnClickCreatePost}
              />
            </div>
          </div>

          <div className='div-preview-img'>
            {previewUrl && (
              <img
                className='img-preview'
                src={previewUrl}
                onClick={handleOnChangeRemoveFile}
                alt='previsualización'
                title='Eliminar imagen'
              />
            )}
          </div>
        </form>
      </div>
    </Layout>
  )
}

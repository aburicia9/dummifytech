import { useNavigate, useParams } from 'react-router'
import './EditPostPage.jsx'
import { useEffect, useRef, useState } from 'react'
import image from '../../assets/post/image_logo.svg'
import { handleAddFilePreview } from '../../utils/handleAddFilePreview'
import { handleRemoveFilePreview } from '../../utils/handleRemoveFilePreview'
import { updatePostService } from '../../services/postService.js'
import { ButtonComponent } from '../../components/Button/ButtonComponent.jsx'
import { Layout } from '../../components/Layout/Layout.jsx'
import { useCategories } from '../../hooks/categories/useCategories.js'
import { selectPostByIdModel } from '../../../../backend/src/models/posts/selectPostByIdModel.js'

export const EditPostPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [categoryId, setCategoryId] = useState(params?.categoryId ?? '')
  const params = useParams()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const { categories } = useCategories()
  const postId = params.postId

  const handleOnChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleOnChangePost = (event) => {
    setPost(event.target.value)
  }
  const handleOnChangeAddFile = (event) => {
    handleAddFilePreview(event, setFile, setPreviewUrl)
  }
  const handleOnChangeRemoveFile = (event) => {
    handleRemoveFilePreview(fileInputRef, setFile, setPreviewUrl)
  }

  const handleOnClickUpdatePost = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('title', title)
      formData.append('post', post)
      if (file) formData.append('imgName', file)

      const body = await updatePostService(postId, formData)

      if (body.status === 'error') {
        throw new Error(body.message)
      }
      navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchUpdatePost = async () => {
      try {
        setLoading(true)
        const result = await (postId)
      } catch (error) {

      } finally {
        setLoading(false)
      }
    }
    fetchUpdatePost()
  }, [])
  return (
    <Layout>
      <div className='div-update-post'>
        <form className='form-update-post'>
          <div className='h2-div'>
            <h2 className='title-update-post'>Edita tu publicación</h2>
          </div>
          <label htmlFor='title' className='label-post-update'>
            Titulo del post:
          </label>
          <input
            type='text'
            id='title'
            className='input-post-update'
            onChange={handleOnChangeTitle}
            value={title}
          />
          <label htmlFor='text' className='label-post-update'>
            Publicación:
          </label>
          <textarea
            id='text'
            cols='30'
            rows='10'
            className='input-post-update-txt'
            onChange={handleOnChangePost}
            value={post}
          />
          <div className='button-position'>
            <section className='category-menu'>
              <select
                id='categorias'
                className='category-menu-select'
                value={categoryId}
                disabled
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

            <div className='button-update-post'>
              <ButtonComponent
                className='button-generic large'
                buttonName='Crear Post'
                handleOnClick={handleOnClickUpdatePost}
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

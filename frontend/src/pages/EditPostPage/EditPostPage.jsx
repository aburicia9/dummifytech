import { useNavigate, useParams } from 'react-router'
import './EditPostPage.css'
import { useEffect, useRef, useState } from 'react'
import image from '../../assets/post/image_logo.svg'
import { handleAddFilePreview } from '../../utils/handleAddFilePreview'
import { handleRemoveFilePreview } from '../../utils/handleRemoveFilePreview'
import { getPostByIdService, updatePostService } from '../../services/postService.js'
import { ButtonComponent } from '../../components/Button/ButtonComponent.jsx'
import { Layout } from '../../components/Layout/Layout.jsx'
import { useCategories } from '../../hooks/categories/useCategories.js'
import { toastifyForm } from '../../utils/Toastify/Toastify'
const baseApiURL = import.meta.env.VITE_API_URL

export const EditPostPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [imgName, setImgName] = useState('')
  const params = useParams()
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
    handleAddFilePreview(event, setImgName, setPreviewUrl)
  }
  const handleOnChangeRemoveFile = (event) => {
    handleRemoveFilePreview(fileInputRef, setImgName, setPreviewUrl)
  }

  const handleOnClickUpdatePost = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('title', title)
      formData.append('post', post)
      if (imgName) formData.append('imgName', imgName)

      const body = await updatePostService(postId, formData)

      if (body.status === 'error') {
        toastifyForm(body)
        throw new Error(body.message)
      }
      toastifyForm(body)
      navigate('/')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchUpdatePost = async () => {
      try {
        setLoading(true)
        const result = await getPostByIdService(postId)
        const resultPost = result.data.posts[0]
        if (result.data.posts.length < 1) {
          toastifyForm(result)
        }

        setTitle(resultPost.title)
        setPost(resultPost.post)
        setCategoryId(resultPost.idCategory)
        setImgName(resultPost.image)
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
          <div className='div-preview-img'>
            <img src={`${baseApiURL}/post/${imgName}`} alt='imagen del post' className='img-preview' />

          </div>
          <div className='button-position'>
            <section className='category-menu'>
              <select
                id='categorias'
                className='category-menu-select'
                value='2'
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
                      value={categoryId}
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
                buttonName='Editar Post'
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

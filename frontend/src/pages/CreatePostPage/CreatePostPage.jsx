import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import { Layout } from '../../components/Layout/Layout'
import './CreatePostPage.css'
import { createPostService } from '../../services/postService'
import { useState } from 'react'
import { toastifyError } from '../../utils/Toastify/Toastify'
import newPost from '../../assets/post/new_post.svg'

export const CreatePostPage = ({ avatar, username }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  const [categoryId, setCategoryId] = useState()
  const [loading, setLoading] = useState(false)

  const handleOnChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleOnChangeText = (event) => {
    setPost(event.target.value)
  }
  const handleOnChangeCategory = (event) => {
    setCategoryId(Number(event.target.value))
  }

  const handleOnClickCreatePost = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const body = await createPostService({ title, post, categoryId })

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
            <h2 className='title-create-post'>Crea tu post<img src={newPost} className='logo-new-post' /></h2>
          </div>
          <label htmlFor='title' className='label-post-create'>Titulo del post:</label>
          <input
            type='text'
            id='title'
            className='input-post-create'
            onChange={handleOnChangeTitle}
            value={title}
          />
          <label htmlFor='text' className='label-post-create'>Publicacion:</label>
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
                <option className='option-subcategory' value='2'>Hardware</option>
                <option className='option-subcategory' value='3'>Software</option>
                <option className='option-subcategory' value='19'>IA</option>
                <option className='option-subcategory' value='6'>PlayStation</option>
                <option className='option-subcategory' value='7'>Xbox</option>
                <option className='option-subcategory' value='8'>PC</option>
                <option className='option-subcategory' value='9'>Nintendo</option>
                <option className='option-subcategory' value='11'>Python</option>
                <option className='option-subcategory' value='12'>Java</option>
                <option className='option-subcategory' value='13'>JavaScript</option>
                <option className='option-subcategory' value='14'>C#Sharp</option>
                <option className='option-subcategory' value='16'>Android</option>
                <option className='option-subcategory' value='17'>IOS</option>
                <option className='option-subcategory' value='18'>DummyMemes</option>
              </select>
            </section>
            <div className='button-create-post'>
              <ButtonComponent
                className='button-generic large'
                buttonName='Crear Post'
                handleOnClick={handleOnClickCreatePost}
              />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

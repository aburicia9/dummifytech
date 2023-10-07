import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import { Layout } from '../../components/Layout/Layout'
import './CreatePostPage.css'
import { useState } from 'react'
import { createPostService } from '../../services/postService'

export const CreatePostPage = ({ avatar }) => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [category, setCategory] = useState()
  const [loading, setLoading] = useState(false)

  const handleOnChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleOnChangeText = (event) => {
    setText(event.target.value)
  }
  const handleOnChangeCategory = (event) => {
    setCategory(event.target.value)
  }

  const resetForm = () => {
    setTitle()
    setText()
  }

  const handleOnClickCreatePost = async () => {
    try {
      setLoading(true)

      // const formData = new FormData()
      // formData.append('text', text)

      const body = await createPostService({ title, text, category })

      if (body.status === 'ok') {
        resetForm()
        navigate('/')
      }

      // if (body.status === 'error') {
      //   throw new Error(body.message)
      // }
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
          <h2 className='title-create-post'>¿En que piensas?</h2>
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
            value={text}
          />
          <div className='button-position'>
            <form class='category-menu'>
              <label className='button-generic' id='categorias'>Categorias</label>
              <select
                id='categorias'
                class='category-menu-select'
                onChange={handleOnChangeCategory}
                value={category}
              >
                <option className='option-subcategory' value='Hardware'>Hardware</option>
                <option className='option-subcategory' value='Software'>Software</option>
                <option className='option-subcategory' value='IA'>IA</option>
                <option className='option-subcategory' value='PlayStation'>PlayStation</option>
                <option className='option-subcategory' value='Xbox'>Xbox</option>
                <option className='option-subcategory' value='PC'>PC</option>
                <option className='option-subcategory' value='Nintendo'>Nintendo</option>
                <option className='option-subcategory' value='Python'>Python</option>
                <option className='option-subcategory' value='Java'>Java</option>
                <option className='option-subcategory' value='JavaScript'>JavaScript</option>
                <option className='option-subcategory' value='C#Sharp'>C#Sharp</option>
                <option className='option-subcategory' value='Android'>Android</option>
                <option className='option-subcategory' value='IOS'>IOS</option>
                <option className='option-subcategory' value='DummyMemes'>DummyMemes</option>
              </select>
            </form>
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

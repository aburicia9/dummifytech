import { ButtonComponent } from '../../components/Button/ButtonComponent'
import { Layout } from '../../components/Layout/Layout'
import { PostHeaderComponent } from '../../components/PostRandom/PostHeader/PostHeaderComponent'
import './CreatePostPage.css'

const baseApiURL = import.meta.env.VITE_API_URL

export const CreatePostPage = (post) => {
  return (
    <Layout>
      <div className='div-create-post'>
        <form className='form-create-post'>
          <PostHeaderComponent avatar={post.avatar} username={post.username} baseApiURL={baseApiURL} />
          <h2 className='title-create-post'>¿En que piensas?</h2>
          <label htmlFor='title' className='label-post-create'>Titulo del post:</label>
          <input type='text' id='title' className='input-post-create' />
          <label htmlFor='text' className='label-post-create'>Publicacion:</label>
          <textarea id='text' cols='30' rows='10' className='input-post-create-txt' />
          <div className='button-position'>
            <form class='category-menu'>
              <label className='button-generic' for='categorias'>Categorias</label>
              <select id='categorias' class='category-menu-select'>
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
              <ButtonComponent className='button-generic large' buttonName='Crear Post' />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

import { ButtonComponent } from '../../components/Button/ButtonComponent'
import { Layout } from '../../components/Layout/Layout'
import './CreatePostPage.css'
export const CreatePostPage = () => {
  return (
    <Layout>
      <div className='div-create-post'>
        <form className='form-create-post'>
          <h2 className='title-create-post'>¡Crea tu post!</h2>
          <label htmlFor='title' className='label-post-create'>Titulo del post:</label>
          <input type='text' id='title' className='input-post-create' />
          <label htmlFor='text' className='label-post-create'>Publicacion:</label>
          <textarea id='text' cols='30' rows='10' className='input-post-create-txt' />
          <div className='button-position'>
            <div class='category-menu'>
              <button className='button-generic'>Categoria</button>
              <div class='category-menu-div'>
                <span>Hardware</span>
                <span>Software</span>
                <span>IA</span>
                <span>PlayStation</span>
                <span>Xbox</span>
                <span>PC</span>
                <span>Nintendo</span>
                <span>Python</span>
                <span>Java</span>
                <span>JavaScript</span>
                <span>C#Sharp</span>
                <span>Android</span>
                <span>IOS</span>
                <span>DummyMemes</span>
              </div>
            </div>
            <div className='button-create-post'>
              <ButtonComponent className='button-generic large' buttonName='Crear Post' />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

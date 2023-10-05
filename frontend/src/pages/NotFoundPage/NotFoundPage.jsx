import './NotFoundPage.css'
import itsFine from '../../assets/this-is-fine-fire.gif'
import { Layout } from '../../components/Layout/Layout'
export const NotFoundPage = () => {
  return (
    <Layout isSearchDisabled isSubcategoryDisabled>
      <div className='div-not-found-father'>
        <div className='div-not-found-son'>
          <h2 className='title-not-found'>Página no encontrada - 404</h2>
          <img src={itsFine} alt='' className='img-not-found' />
        </div>
      </div>
    </Layout>
  )
}

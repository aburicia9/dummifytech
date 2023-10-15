import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import './ListReqCategoriesPage.css'
import deleteReqCategorySvg from '../../assets/categories/button_rejected.svg'
import createReqCategorySvg from '../../assets/categories/button_tick.svg'
import { createCategoryService, listReqCategoriesService, updateReqCategoryService } from '../../services/categoryService'
import { toastifyForm } from '../../utils/Toastify/Toastify'

const baseApiURL = import.meta.env.VITE_API_URL

export const ListReqCategoriesPage = () => {
  const [loading, setLoading] = useState(false)

  const [listReqCategories, setListReqCategories] = useState([])
  const fetchReqCategories = async () => {
    try {
      setLoading(true)
      const body = await listReqCategoriesService()

      setListReqCategories(body.data.reqCategories)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchReqCategories()
  }, [])
  return (
    <Layout>
      <article className='article-listReqCategories'>
        <section className='section-listReqCategories'>
          <ul className='ul-listReqCategory'>

            {
              listReqCategories?.map((listReqCategory) => {
                return (
                  <li key={listReqCategory.id} className='li-listReqCategory'>
                    <section className='section-header-listReqCategory'>
                      <img src={`${baseApiURL}/avatar/${listReqCategory.avatar}`} alt='icono del usuario' className='img-user' />
                      {listReqCategory.username}
                    </section>
                    <section className='section-categoryParent-listReqCategory'>
                      <h4>Categoria principal</h4>
                      {listReqCategory.name}
                    </section>
                    <section className='section-body-listReqCategory'>
                      <h4 className='title-reqCategory'>
                        Nombre de la categoria:
                      </h4>
                      {listReqCategory.name_category}
                    </section>
                    <section className='section-footer-listReqCategory'>
                      <h4 className='title-reqCategory'>
                        Razon:
                      </h4>
                      {listReqCategory.reason}
                    </section>
                    <section className='buttons-reqCategory-position'>
                      <button
                        className='button-reqCategory'
                        onClick={async () => {
                          try {
                            setLoading(true)
                            const accepted = 1
                            const statusReq = 1
                            const requestCategoryId = listReqCategory.id
                            const result = await updateReqCategoryService(requestCategoryId, statusReq, accepted)
                            if (result.status === 'ok') {
                              await fetchReqCategories()
                              toastifyForm(result)
                            } else if (result.status === 'error') {
                              toastifyForm(result)
                            }
                            const subCategories = listReqCategory.idCategoryParent
                            const name = listReqCategory.name_category
                            const description = listReqCategory.reason
                            const newCategory = await createCategoryService(subCategories, name, description)
                            if (newCategory === 'ok') {
                              await fetchReqCategories()
                              toastifyForm(newCategory)
                            } else if (newCategory === 'error') {
                              toastifyForm(newCategory)
                            }
                          } catch (error) {
                            console.error(error.message)
                          } finally {
                            setLoading(false)
                          }
                        }}
                      >
                        <img src={createReqCategorySvg} alt='boton para aceptar petición' title='Crear categoria' />
                      </button>
                      <button
                        className='button-reqCategory'
                        onClick={async () => {
                          try {
                            setLoading(true)
                            const accepted = 0
                            const statusReq = 1
                            const requestCategoryId = listReqCategory.id
                            const result = await updateReqCategoryService(requestCategoryId, statusReq, accepted)
                            if (result.status === 'ok') {
                              await fetchReqCategories()
                              toastifyForm(result)
                            } else if (result.status === 'error') {
                              toastifyForm(result)
                            }
                          } catch (error) {
                            console.error(error.message)
                          } finally {
                            setLoading(false)
                          }
                        }}
                      >
                        <img src={deleteReqCategorySvg} alt='boton para borrar petición' title='Borrar peticion' />
                      </button>
                    </section>
                  </li>

                )
              })
          }
          </ul>
        </section>
      </article>
    </Layout>
  )
}

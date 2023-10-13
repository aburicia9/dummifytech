import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { PostListComponent } from '../../components/PostRandom/PostListComponent'
import './ListReqCategoriesPage.css'
import { listReqCategoriesService } from '../../services/categoryService'

export const ListReqCategoriesPage = () => {
  const [loading, setLoading] = useState(false)
  const [listReqCategories, setListReqCategories] = useState([])
  useEffect(() => {
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
    fetchReqCategories()
  }, [])
  return (
    <Layout>
      <article className='article-listReqCategories'>
        <section className='section-listReqCategories'>
          <ul>

            {
            listReqCategories?.map((listReqCategory) => {
              console.log(listReqCategory)
              return (
                <li key={listReqCategory.id}>
                  <section className='section-listReqCategory'>
                    <span>
                      Usuario:
                    </span>
                    {listReqCategory.username}
                    <span>
                      Nombre de la categoria:
                    </span>
                    {listReqCategory.name_category}
                    <span>
                      Razon:
                    </span>
                    {listReqCategory.reason}
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

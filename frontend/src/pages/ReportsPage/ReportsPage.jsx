import './ReportsPage.css'
import { Layout } from '../../components/Layout/Layout'
import noData from '../../assets/post/no-data-post.gif'
import { TitleCategory } from '../../components/titleCategory/titleCategory'
import { useEffect, useState } from 'react'
import { listReportPostService } from '../../services/postService'
import { toastifyForm } from '../../utils/Toastify/Toastify'
import { PostListComponent } from '../../components/PostRandom/PostListComponent'

export const ReportsPage = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const lengthReports = true

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
        const body = await listReportPostService()
        console.log(body)
        setReports(body.data.reports)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [])
  return (
    <Layout>
      {/* <article className='article-reports'>
        <TitleCategory />
        {lengthReports
          ? (
              reports.map((report) => {
                return (
                  <section className='section-reports' key={report.id}>
                    <p>{report.title}</p>
                  </section>
                )
              })
            )
          : (
            <section className='section-no-post'>
              <h3 className='title-no-post'>
                No hay ninguna publicacion reportada
              </h3>
              <div className='div-no-data-post'>
                <img
                  src={noData}
                  alt='gif no data'
                  className='img-no-data-post'
                />
              </div>
            </section>
            )}
      </article> */}
      <PostListComponent posts={reports} />
    </Layout>
  )
}

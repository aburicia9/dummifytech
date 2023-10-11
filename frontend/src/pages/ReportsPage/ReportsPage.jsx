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
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
        const body = await listReportPostService()
        console.log(body.data.reports)
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
      <PostListComponent posts={reports} showFooter={false} disableNavigate showCreatePost />
    </Layout>
  )
}

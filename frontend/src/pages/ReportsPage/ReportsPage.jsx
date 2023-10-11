import './ReportsPage.css'
import { Layout } from '../../components/Layout/Layout'
import { useEffect, useState } from 'react'
import { listReportPostService } from '../../services/postService'
import { PostListComponent } from '../../components/PostRandom/PostListComponent'

export const ReportsPage = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchReports = async () => {
    try {
      setLoading(true)
      const body = await listReportPostService()

      setReports(body.data.reports)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])
  return (
    <Layout>
      <PostListComponent
        showDetailPost
        disableNavigate
        posts={reports}
        showFooter={false}
        showCreatePost
        fetchPosts={fetchReports}
        reportId

      />
    </Layout>
  )
}

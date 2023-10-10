import './HomePage.css'
import { Layout } from '../../components/Layout/Layout'
import { PostListComponent } from '../../components/PostRandom/PostListComponent'
import { usePosts } from '../../hooks/posts/usePosts'

export const HomePage = ({ showEditDeleteButtons }) => {
  const { posts, fetchPosts, categoryId } = usePosts()
  return (
    <Layout isSubcategoryDisabled isSearchDisabled>
      <PostListComponent posts={posts} fetchPosts={fetchPosts} categoryId={categoryId} showEditDeleteButtons={showEditDeleteButtons} />
    </Layout>
  )
}

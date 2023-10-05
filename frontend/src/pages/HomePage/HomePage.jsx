import './HomePage.css'

import { Layout } from '../../components/Layout/Layout'
import { PostListComponent } from '../../components/PostRandom/PostListComponent'
import { usePosts } from '../../hooks/posts/usePosts'

export const HomePage = () => {
  const { posts, fetchPosts } = usePosts()

  return (
    <Layout isSubcategoryDisabled isSearchDisabled>
      <PostListComponent posts={posts} fetchPosts={fetchPosts} />
    </Layout>
  )
}

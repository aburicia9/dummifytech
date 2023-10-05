import './HomePage.css'

import { Layout } from '../../components/Layout/Layout'
import { PostListComponent } from '../../components/PostRandom/PostListComponent'
import { usePosts } from '../../hooks/posts/usePosts'

export const HomePage = () => {
  const { posts } = usePosts()
  return (
    <Layout isSubcategoryDisabled isSearchDisabled isUserLogged={false}>
      <PostListComponent posts={posts} />
    </Layout>
  )
}

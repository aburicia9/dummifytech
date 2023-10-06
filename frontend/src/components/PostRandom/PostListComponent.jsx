import { PostBodyComponent } from './PostBody/PostBodyComponent'
import './PostListComponent.css'
import { PostFooterComponent } from './PostFooter/PostFooterComponent'
import { PostHeaderComponent } from './PostHeader/PostHeaderComponent'
import noData from '../../assets/post/no_data_post.gif'
import { TitleCategory } from '../titleCategory/titleCategory'

const baseApiURL = import.meta.env.VITE_API_URL

export const PostListComponent = ({ posts, fetchPosts }) => {
  let lengthPosts = true
  lengthPosts = Object(posts).length

  return (
    <article className='article-post'>
      <TitleCategory />

      {
      lengthPosts
        ? posts.map((post) => {
          return (

            <section className='section-post' key={post.id}>
              <PostHeaderComponent avatar={post.avatar} username={post.username} createdAt={post.createdAt} baseApiURL={baseApiURL} postId={post.id} />
              <PostBodyComponent title={post.title} image={post.image} post={post.post} baseApiURL={baseApiURL} />
              <PostFooterComponent fetchPosts={fetchPosts} postId={post.id} ownerLikes={post.ownerLikes} ownerDislikes={post.ownerDislikes} countLikes={post.countLikes} countComments={post.countComments} />
            </section>

          )
        })
        : <section className='section-no-post'>
          <h3 className='title-no-post'>No hay posts</h3>
          <div className='div-no-data-post'>
            <img src={noData} alt='gif no data' className='img-no-data-post' />
          </div>
          </section>
      }
    </article>
  )
}

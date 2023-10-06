import { PostBodyComponent } from './PostBody/PostBodyComponent'
import './PostListComponent.css'
import { PostFooterComponent } from './PostFooter/PostFooterComponent'
import { PostHeaderComponent } from './PostHeader/PostHeaderComponent'
const baseApiURL = import.meta.env.VITE_API_URL

export const PostListComponent = ({ posts, fetchPosts }) => {
  let lengthPosts = true
  lengthPosts = Object(posts).length

  return (
    <article className='article-post'>
      {
      lengthPosts
        ? posts.map((post) => {
          console.log(post.id)
          return (

            <section className='section-post' key={post.id}>
              <PostHeaderComponent avatar={post.avatar} username={post.username} createdAt={post.createdAt} baseApiURL={baseApiURL} postId={post.id} />
              <PostBodyComponent title={post.title} image={post.image} post={post.post} baseApiURL={baseApiURL} />
              <PostFooterComponent fetchPosts={fetchPosts} postId={post.id} ownerLikes={post.ownerLikes} ownerDislikes={post.ownerDislikes} countLikes={post.countLikes} countComments={post.countComments} />
            </section>

          )
        })
        : <section className='section-post'>
          <PostHeaderComponent />
          <PostBodyComponent />
          <PostFooterComponent />
        </section>
      }
    </article>
  )
}

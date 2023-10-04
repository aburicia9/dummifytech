import { PostBodyComponent } from './PostBody/PostBodyComponent'
import './PostListComponent.css'
import { PostFooterComponent } from './PostFooter/PostFooterComponent'
import { PostHeaderComponent } from './PostHeader/PostHeaderComponent'
const baseApiURL = import.meta.env.VITE_API_URL

export const PostListComponent = ({ posts }) => {
  return (
    <article className='article-post'>
      {
        posts.map((post) => {
          console.log(post)
          return (
            <section className='section-post' key={post.id}>
              <PostHeaderComponent avatar={post.avatar} username={post.username} createdAt={post.createdAt} baseApiURL={baseApiURL} />
              <PostBodyComponent title={post.title} image={post.image} post={post.post} baseApiURL={baseApiURL} />
              <PostFooterComponent countLikes={post.countLikes} countComments={post.countComments} />
            </section>
          )
        })
      }

    </article>
  )
}

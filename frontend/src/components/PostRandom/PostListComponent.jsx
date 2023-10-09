import { PostBodyComponent } from './PostBody/PostBodyComponent'
import './PostListComponent.css'
import { PostFooterComponent } from './PostFooter/PostFooterComponent'
import { PostHeaderComponent } from './PostHeader/PostHeaderComponent'
import noData from '../../assets/post/no-data-post.gif'
import { TitleCategory } from '../titleCategory/titleCategory'
import { Link } from 'react-router-dom'
import buttonNewPost from '../../assets/post/button_new_post.svg'

const baseApiURL = import.meta.env.VITE_API_URL

export const PostListComponent = ({ posts, fetchPosts, categoryId }) => {
  let lengthPosts = true
  lengthPosts = Object(posts).length

  return (
    <article className='article-post'>
      <TitleCategory />
      <Link to={`/posts/insert${categoryId ? `/${categoryId}` : ''}`} className='link-new-post'>
        <input placeholder='Crea un nuevo post' className='input-new-post' />
        <button className='button-new-post'><img src={buttonNewPost} alt='' /></button>
      </Link>

      {lengthPosts
        ? (
            posts.map((post) => {
              return (
                <section className='section-post' key={post.id}>
                  <PostHeaderComponent
                    avatar={post.avatar}
                    username={post.username}
                    createdAt={post.createdAt}
                    baseApiURL={baseApiURL}
                    postId={post.id}
                  />
                  <PostBodyComponent
                    title={post.title}
                    image={post.image}
                    post={post.post}
                    baseApiURL={baseApiURL}
                  />
                  <PostFooterComponent
                    fetchPosts={fetchPosts}
                    postId={post.id}
                    ownerLikes={post.ownerLikes}
                    ownerDislikes={post.ownerDislikes}
                    ownerReports={post.ownerReports}
                    countLikes={post.countLikes}
                    countComments={post.countComments}
                  />
                </section>
              )
            })
          )
        : (
          <section className='section-no-post'>
            <h3 className='title-no-post'>
              No se ha encontrado ninguna publicación, prueba con otra búsqueda o
              categoría
            </h3>
            <div className='div-no-data-post'>
              <img src={noData} alt='gif no data' className='img-no-data-post' />
            </div>
          </section>
          )}
    </article>
  )
}

import { useRandomPost } from '../../hooks/useRandomPost'

export const PostComponent = ({id, username, createdAt, title, post, image}) => {
  const { randomPosts } = useRandomPost()
  return (
    <section className='home-page-post-random'>
      {
        randomPosts.map((randomPost) => {
          console.log(randomPost)
          return (
            <article key={randomPost.id}>
              <p>{randomPost.username}</p>
              <p>{randomPost.createdAt}</p>
              <p>{randomPost.title}</p>
              <p>{randomPost.post}</p>
              <img src={randomPost.image} alt='' />
            </article>
          )
        })
      }
    </section>
  )
}

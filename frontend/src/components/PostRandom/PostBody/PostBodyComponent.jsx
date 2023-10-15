import './PostBodyComponent.css'

export const PostBodyComponent = ({
  title = '',
  image = '',
  post = '',
  baseApiURL = '',
  showDetailPost = false
}) => {
  const postSlice = post.slice(0, 50) + '...'

  return (
    <article className='body-article-post'>
      <h2 className='body-title-post'>{title}</h2>
      <section className='body-image-text-post'>
        {showDetailPost
          ? (
              image
                ? (
                  <>
                    <img
                      src={`${baseApiURL}/post/${image}`}
                      alt='Post de la imagen'
                    />
                    <p>{post}</p>
                  </>
                  )
                : (
                  <>
                    <p>{post}</p>
                  </>
                  )
            )
          : image
            ? (
              <img src={`${baseApiURL}/post/${image}`} alt='Post de la imagen' />
              )
            : (
              <p>
                {postSlice}{' '}
                <button className='button-leer-body-post'>[Leer +]</button>
              </p>
              )}
      </section>
    </article>
  )
}

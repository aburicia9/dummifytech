import './PostBodyComponent.css'

export const PostBodyComponent = ({ title = '', image = '', post = '', baseApiURL = '' }) => {
  const postSlice = post.slice(0, 50) + '...'

  return (
    <div className='body-div-post'>
      <h2 className='body-title-post'>{title}</h2>
      <div className='body-image-text-post'>
        {image
          ? <img src={`${baseApiURL}/post/${image}`} alt='Post de la imagen' />
          : <p>{postSlice} <button className='button-leer-body-post'>[Leer +]</button></p>}
      </div>
    </div>
  )
}

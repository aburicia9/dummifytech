import './PostBodyComponent.css'

export const PostBodyComponent = ({ title, image, post, baseApiURL }) => {
  const postSlice = post.slice(0, 50)
  return (
    <div>
      <h2>{title}</h2>
      <div>
        {image
          ? <img src={`${baseApiURL}/post/${image}`} alt='Post de la imagen' />
          : <p>{postSlice}</p>}
      </div>
    </div>
  )
}

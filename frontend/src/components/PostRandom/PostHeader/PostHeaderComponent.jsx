import './PostHeaderComponent.css'

export const PostHeaderComponent = ({ avatar, username, createdAt, baseApiURL, postId }) => {
  const createdAtModificated = new Date(createdAt).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
  return (
    <div className='header-post'>
      <img src={`${baseApiURL}/avatar/${avatar}`} alt='Avatar de la usuario' style={{ width: '80px', height: '80px' }} />
      {/* <img src='http://localhost:8000/uploads/post/fbb6eb87-3cd5-47fb-a6de-0e24950d3e24.jpg' alt='Post de la imagen' /> */}
      <p className='header-post-username'>{username}</p>
      <p className='header-post-date'>{createdAtModificated}</p>
      <p>Post Id: {postId}</p>
    </div>

  )
}

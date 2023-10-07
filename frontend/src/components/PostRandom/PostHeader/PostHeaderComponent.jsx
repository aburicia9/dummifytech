import './PostHeaderComponent.css'

export const PostHeaderComponent = ({ avatar, username, createdAt, baseApiURL }) => {
  const createdAtModificated = new Date(createdAt).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
  return (
    <div className='header-post'>
      <img src={`${baseApiURL}/avatar/${avatar}`} alt='Avatar de la usuario' style={{ width: '80px', height: '80px' }} className='img-header-post' />
      <p className='header-post-username'>{username}</p>
      <p className='header-post-date'>{createdAtModificated}</p>

    </div>

  )
}

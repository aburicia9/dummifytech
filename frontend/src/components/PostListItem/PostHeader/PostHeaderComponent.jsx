import './PostHeaderComponent.css'

export const PostHeaderComponent = ({ username, createdAt }) => {
  return (
    <header className='post-header'>
      <p>{username}</p>
      <time>
        {new Date(createdAt).toLocaleDateString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: '4-digit'
        })}
      </time>
    </header>
  )
}

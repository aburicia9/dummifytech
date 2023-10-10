import { formatDate } from '../../../utils/helpers'
import './PostHeaderComponent.css'

export const PostHeaderComponent = ({ avatar, username, createdAt, baseApiURL }) => {
  return (
    <div className='header-post'>
      <img src={`${baseApiURL}/avatar/${avatar}`} alt='Avatar del usuario' style={{ width: '80px', height: '80px' }} className='img-header-post' />
      <p className='header-post-username'>{username}</p>
      <p className='header-post-date'>{formatDate(createdAt)}</p>

    </div>

  )
}

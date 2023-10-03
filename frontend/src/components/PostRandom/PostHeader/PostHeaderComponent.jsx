import './PostHeaderComponent.css'

export const PostHeaderComponent = ({ avatar, username, createdAt, baseApiURL }) => {
  return (
    <div>
      <img src={`${baseApiURL}/avatar/${avatar}`} alt='Avatar de la usuario' style={{ width: '80px', height: '80px' }} />
      {/* <img src='http://localhost:8000/uploads/post/fbb6eb87-3cd5-47fb-a6de-0e24950d3e24.jpg' alt='Post de la imagen' /> */}
      <p>{username}</p>
      <p>{createdAt}</p>
    </div>

  )
}

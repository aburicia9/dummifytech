import './PostBodyComponent.css'

// URL base del API.
const baseApiURL = import.meta.env.VITE_API_URL

export const PostBodyComponent = ({ title, text, image }) => {
  return (
    <div className='post-body'>
      <h4>{title}</h4>
      {image
        ? (
          <img
            src={`${baseApiURL}/${image}`}
            alt='Imagen adjunta al post'
          />
          )
        : { text }}
    </div>
  )
}

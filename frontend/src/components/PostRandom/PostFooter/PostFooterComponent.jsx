import './PostFooterComponent.css'

export const PostFooterComponent = ({ countLikes, countComments }) => {
  return (
    <div>
      <button>Me gusta</button>{countLikes}
      <button>No me gusta</button>
      <button>Comentarios</button>{countComments}
      <button>Reports</button>
    </div>
  )
}

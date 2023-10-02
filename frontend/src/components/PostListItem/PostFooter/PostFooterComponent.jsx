// Importamos los prop-types.
import PropTypes from 'prop-types'
import { userPropTypes } from '../../../utils/customPropTypes'

// Importamos los hooks.
import { useState } from 'react'

// Importamos los servicios.
import {
  likeTweetService,
  deleteTweetService
} from '../../../services/tweetService'

// Importamos los estilos.
import './TweetFooter.css'

export const PostFooterComponent = ({ authUser, tweetId, owner, likes, likedByMe, likeTweetById, deleteTweetById }) => {
  const [loading, setLoading] = useState(false)

  // Función que modifica un like.
  const handleLikeTweet = async () => {
    try {
      setLoading(true)

      // Si existe un like previo eliminamos el like, de lo contrario lo creamos.
      const method = likedByMe ? 'delete' : 'post'

      // Modificamos el like en la base de datos.
      await likeTweetService(tweetId, method)

      // Modificamos el array de tweets en el State.
      likeTweetById(tweetId)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Función que elimina el tweet.
  const handleDeleteTweet = async () => {
    if (confirm('¿Deseas eliminar el tweet?')) {
      try {
        setLoading(true)

        // Eliminamos el tweet en la base de datos.
        await deleteTweetService(tweetId)

        // Modificamos el array de tweets en el State.
        deleteTweetById(tweetId)
      } catch (err) {
        alert(err.message)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <footer className='tweet-footer'>
      <div>
        <div
          className={`heart ${likedByMe && 'like'}`}
          onClick={() => {
            // Si estamos logeados y loading no está establecido a true permitimos
            // al usuario crear o eliminar el like.
            authUser && !loading && handleLikeTweet()
          }}
        />
        <p>{likes}</p>
      </div>
      {owner && (
        <button onClick={() => handleDeleteTweet()}>Eliminar</button>
      )}
    </footer>
  )
}

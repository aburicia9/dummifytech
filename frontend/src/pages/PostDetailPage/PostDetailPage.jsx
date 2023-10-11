import { useParams } from 'react-router'
import { Layout } from '../../components/Layout/Layout'
import { PostListComponent } from '../../components/PostRandom/PostListComponent'
import { createCommentPostService, deleteCommentPostService, getPostByIdService, listCommentsPostService } from '../../services/postService'
import './PostDetailPage.css'
import { useEffect, useMemo, useState } from 'react'
import { formatDate } from '../../utils/helpers'
import editSvg from '../../assets/comments/button_edit.svg'
import deleteSvg from '../../assets/comments/button_delete.svg'
import commentSvg from '../../assets/comments/button_comment.svg'
import { toastifyConfirm, toastifyForm } from '../../utils/Toastify/Toastify'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-toastify'
const baseApiURL = import.meta.env.VITE_API_URL

export const PostDetailPage = () => {
  const [posts, setPosts] = useState([])
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const postId = params.postId
  const [comment, setComment] = useState('')
  const { authUser } = useAuth()

  const handleOnChange = (event) => {
    setComment(event.target.value)
  }
  const onClickCreateComment = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const result = await createCommentPostService(postId, comment)

      if (result.status === 'ok') {
        await fetchPostById()
        setComment('')
        toastifyForm(result)
      } else {
        toastifyForm(result)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  const fetchPostById = async () => {
    try {
      setLoading(true)

      const body = await getPostByIdService(postId)
      setPosts(body.data.posts)
      const bodyComments = await listCommentsPostService(postId)
      setComments(bodyComments.data.comments)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPostById()
  }, [])

  return (
    <Layout>

      <PostListComponent fetchPosts={fetchPostById} showCreatePost posts={posts} className='PostListComponent-details' showDetailPost disableNavigate />

      <div className='div-comments'>
        <div className='div-div-comments'>
          <form className='from-create-comments'>
            <h3>Comentario</h3>
            <textarea type='text' className='textarea-create-comments' onChange={handleOnChange} value={comment} />
            <div className='div-button-create-comment'>
              <button onClick={onClickCreateComment} className='button-create-comment' title='Comentar'>
                <img src={commentSvg} alt='' />
              </button>
            </div>
          </form>
          <ul className='ul-comments'>
            {
          comments.map((comment) => {
            const formattedDate = useMemo(() => formatDate(comment.createdAt), [comments])
            return (
              <li key={comment.id} className='li-comment'>
                <aside className='aside-header-comment'>
                  <img src={`${baseApiURL}/avatar/${comment.avatar}`} alt='avatar del usuario' className='img-comment-post' />
                  <div className='div-line-aside' />
                </aside>
                <article className='article-comment'>
                  <header className='header-comment'>
                    <span>{comment.username}</span>
                    <span>{formattedDate}</span>
                  </header>
                  <section className='section-body-comment'>
                    <p className='p-body-comment'>
                      {comment.comment}
                    </p>
                    <ul className='ul-buttons-comments'>
                      {comment.idUser === authUser.id
                        ? (
                          <>
                            <li>
                              <button className='button-comment' title='Editar'>
                                <img src={editSvg} alt='boton para editar un comentario' />
                              </button>
                            </li>
                            <li>
                              <button
                                className='button-comment' title='Borrar' onClick={async () => {
                                  try {
                                    setLoading(true)
                                    const deteleComment = async () => {
                                      try {
                                        setLoading(true)
                                        const result = await deleteCommentPostService(postId, comment.id)
                                        if (result.status === 'ok') {
                                          toast.dismiss()
                                          toastifyForm(result)
                                          await fetchPostById()
                                        } else {
                                          toast.dismiss()
                                          toastifyForm(result)
                                        }
                                      } catch (error) {
                                        console.error(error)
                                      } finally {
                                        setLoading(false)
                                      }
                                    }

                                    toastifyConfirm('¿Estas seguro que quieres eliminar este comentario?', deteleComment)
                                  } catch (error) {
                                    console.error(error)
                                  } finally {
                                    setLoading(false)
                                  }
                                }}
                              >
                                <img src={deleteSvg} alt='boton para eliminar un comentario' />
                              </button>
                            </li>
                          </>
                          )
                        : (
                          <>
                          </>
                          )}

                    </ul>
                  </section>
                </article>
              </li>
            )
          })
          }
          </ul>
        </div>
      </div>
    </Layout>
  )
}

import './PostFooterComponent.css'
import like from '../../../assets/post/button_like.svg'
import likeOn from '../../../assets/post/button_like_on.svg'
import dislike from '../../../assets/post/button_dislike.svg'
import dislikeOn from '../../../assets/post/button_dislike_on.svg'
import comment from '../../../assets/post/button_comments.svg'
import report from '../../../assets/post/button_report.svg'
import reportOn from '../../../assets/post/button_report_on.svg'
import {
  deleteAllReportsByPostIdService,
  deletePostService,
  dislikePostService,
  likePostService,
  reportPostService
} from '../../../services/postService'
import { toast } from 'react-toastify'
import deleteButton from '../../../assets/post/button_delete.svg'
import editButton from '../../../assets/post/button_edit.svg'
import { useNavigate } from 'react-router'
import { toastifyConfirm, toastifyForm } from '../../../utils/Toastify/Toastify'
import { useState } from 'react'
import svgDeleteReport from '../../../assets/reports/button_delete_report.svg'
import { useAuth } from '../../../hooks/useAuth'

export const PostFooterComponent = ({
  fetchPosts,
  postId = '',
  ownerLikes = '',
  ownerDislikes = '',
  ownerReports = '',
  countLikes = '',
  countComments = '',
  showEditDeleteButtons = false,
  showFooter = true,
  countReports = '',
  reportsPostId = '',
  reportId = ''

}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  const onClickLikePost = async () => {
    let method = ''

    if (ownerLikes === 1) {
      method = 'delete'
      const resultDelete = await likePostService(postId, method)
      if (resultDelete?.status === 'ok') {
        await fetchPosts()
      }
    } else {
      method = 'post'
      const resultPut = await likePostService(postId, method)
      if (resultPut?.status === 'ok') {
        await fetchPosts()
      }
    }
  }

  const onClickDislikePost = async () => {
    let method = ''

    if (ownerDislikes === 1) {
      method = 'delete'
      const resultDelete = await dislikePostService(postId, method)
      if (resultDelete?.status === 'ok') {
        await fetchPosts()
      }
    } else {
      method = 'post'
      const resultPut = await dislikePostService(postId, method)
      if (resultPut?.status === 'ok') {
        await fetchPosts()
      }
    }
  }

  const onClickReportPost = async () => {
    let method = ''
    if (ownerReports === 1) {
      method = 'delete'
      const resultDelete = await reportPostService(postId, method)
      if (resultDelete?.status === 'ok') {
        await fetchPosts()
      }
    } else {
      method = 'post'
      const resultPut = await reportPostService(postId, method)
      if (resultPut?.status === 'ok') {
        await fetchPosts()
      }
    }
  }

  const onClickEditPost = () => {
    navigate(`/posts/${postId}/edit`)
  }

  const onClickPostDetail = () => {
    navigate(`/posts/${postId}`)
  }

  const onClickDeletePost = () => {
    try {
      setLoading(true)
      const deletePost = async () => {
        let deletePostId = reportsPostId
        if (!reportsPostId) {
          deletePostId = postId
        }
        const result = await deletePostService(deletePostId)
        if (result === 'ok') {
          toast.dismiss()
          await fetchPosts()
          toastifyForm(result)
        } else {
          toast.dismiss()
          toastifyForm(result)
          await fetchPosts()
        }
      }
      toastifyConfirm('¿Estas seguro que quieres eliminar este post?', deletePost)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onClickDeleteReport = () => {
    try {
      setLoading(true)
      const deletePost = async () => {
        const result = await deleteAllReportsByPostIdService(reportsPostId)
        if (result === 'ok') {
          toast.dismiss()
          await fetchPosts()
          toastifyForm(result)
        } else {
          toast.dismiss()
          toastifyForm(result)
          await fetchPosts()
        }
      }
      toastifyConfirm('¿Estas seguro que quieres eliminar todos los reportes?', deletePost)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function DeleteButton ({ title, imgDeleteButton, onClick }) {
    return (
      <button
        className={loading || !isAuthenticated ? 'button-report-footer-post disabled' : 'button-report-footer-post'}
        title={title}
        disabled={loading}
      >
        <img
          src={imgDeleteButton}
          alt='delete post button '
          onClick={onClick}
        />
      </button>
    )
  }

  return (
    <div className='div-footer-post'>
      {showFooter
        ? (
          <>
            <div className='div-like-footer-post'>

              <button className={loading || !isAuthenticated ? 'button-like-footer-post disabled' : 'button-like-footer-post'} title='Me gusta'>
                <img
                  src={ownerLikes ? likeOn : like}
                  alt='like image button'
                  onClick={onClickLikePost}

                />
              </button>
              <span className='span-countlikes-footer-post'>{countLikes}</span>
            </div>

            <button className={loading || !isAuthenticated ? 'button-dislike-footer-post disabled' : 'button-dislike-footer-post'} title='No me gusta'>
              {' '}
              <img
                src={ownerDislikes ? dislikeOn : dislike}
                alt='dislike image button'
                onClick={onClickDislikePost}

              />
            </button>
            <div className='div-comment-footer-post'>

              <button
                className={loading || !isAuthenticated ? 'button-comment-footer-post disabled' : 'button-comment-footer-post'}
                title='Comentarios'
                onClick={onClickPostDetail}
              >
                <img src={comment} alt='comment image button' />
              </button>
              <span className='span-countcomments-footer-post'>{countComments}</span>
            </div>

            <button className={loading || !isAuthenticated ? 'button-report-footer-post disabled' : 'button-report-footer-post'} title='Reportar'>
              <img
                src={ownerReports ? reportOn : report}
                alt='report image button'
                onClick={onClickReportPost}
              />
            </button>

            {showEditDeleteButtons
              ? (
                <>
                  <button
                    className='button-report-footer-post'
                    title='Editar'
                  >
                    <img
                      src={editButton}
                      alt='report image button'
                      onClick={onClickEditPost}
                    />
                  </button>
                  <DeleteButton imgDeleteButton={deleteButton} />
                </>
                )
              : (
                <></>
                )}
          </>
          )
        : (
          <>
            <div className='div-delete-report'>
              <DeleteButton imgDeleteButton={svgDeleteReport} onClick={onClickDeleteReport} title='Eliminar reporte' />
              <span>Eliminar reporte</span>
            </div>
            <div className='div-like-footer-post'>
              <button className='button-like-footer-post'>
                <img
                  src={reportOn}
                  alt='like image button'
                  title='Report'
                />
              </button>
              <span className='span-countlikes-footer-post'>{countReports}</span>
            </div>
            <div className='div-delete-report'>
              <DeleteButton imgDeleteButton={deleteButton} onClick={onClickDeletePost} title='Eliminar publicacion' />
              <span>Eliminar publicacion</span>
            </div>

          </>
          )}

    </div>
  )
}

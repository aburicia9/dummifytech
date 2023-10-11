import './PostFooterComponent.css'
import like from '../../../assets/post/button_like.svg'
import likeOn from '../../../assets/post/button_like_on.svg'
import dislike from '../../../assets/post/button_dislike.svg'
import dislikeOn from '../../../assets/post/button_dislike_on.svg'
import comment from '../../../assets/post/button_comments.svg'
import report from '../../../assets/post/button_report.svg'
import reportOn from '../../../assets/post/button_report_on.svg'
import {
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
import { useAuth } from '../../../hooks/useAuth'
// import { useAuth } from '../../../hooks/useAuth'

export const PostFooterComponent = ({
  fetchPosts,
  postId = '',
  ownerLikes = '',
  ownerDislikes = '',
  ownerReports = '',
  countLikes = '',
  countComments = '',
  showEditDeleteButtons = false
}) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  let likeOrLikeOn = like
  let disLikeOrDislikeOn = dislike
  let reportOrReportOn = report

  if (ownerLikes) {
    likeOrLikeOn = likeOn
  }
  if (ownerDislikes) {
    disLikeOrDislikeOn = dislikeOn
  }
  if (ownerReports) {
    reportOrReportOn = reportOn
  }

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
        const result = await deletePostService(postId)
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
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='div-footer-post'>
      <div className='div-like-footer-post'>
        <button className='button-like-footer-post'>
          <img
            src={likeOrLikeOn}
            alt='like image button'
            onClick={onClickLikePost}
            title='Me gusta'
          />
        </button>
        <span className='span-countlikes-footer-post'>{countLikes}</span>
      </div>
      <button className='button-dislike-footer-post' title='No me gusta'>
        {' '}
        <img
          src={disLikeOrDislikeOn}
          alt='dislike image button'
          onClick={onClickDislikePost}
        />
      </button>
      <div className='div-comment-footer-post'>
        <button
          className='button-comment-footer-post'
          title='Comentarios'
          onClick={onClickPostDetail}
        >
          <img src={comment} alt='comment image button' />
        </button>
        <span className='span-countcomments-footer-post'>{countComments}</span>
      </div>
      <button className='button-report-footer-post' title='Reportar'>
        <img
          src={reportOrReportOn}
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
            <button
              className={loading ? 'button-report-footer-post disabled' : 'button-report-footer-post'}
              title='Borrar'
              disabled={loading}
            >
              <img
                src={deleteButton}
                alt='delete post button '
                onClick={onClickDeletePost}
              />
            </button>
          </>
          )
        : (
          <></>
          )}
    </div>
  )
}

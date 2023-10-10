import './PostFooterComponent.css'
import like from '../../../assets/post/button_like.svg'
import likeOn from '../../../assets/post/button_like_on.svg'
import dislike from '../../../assets/post/button_dislike.svg'
import dislikeOn from '../../../assets/post/button_dislike_on.svg'
import comment from '../../../assets/post/button_comments.svg'
import report from '../../../assets/post/button_report.svg'
import reportOn from '../../../assets/post/button_report_on.svg'
import { deletePostService, dislikePostService, likePostService, reportPostService } from '../../../services/postService'
import deleteButton from '../../../assets/post/button_delete.svg'
import editButton from '../../../assets/post/button_edit.svg'
import { useNavigate } from 'react-router'

export const PostFooterComponent = ({ fetchPosts = '', postId = '', ownerLikes = '', ownerDislikes = '', ownerReports = '', countLikes = '', countComments = '', showEditDeleteButtons = true }) => {
  const navigate = useNavigate()
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
        fetchPosts()
      }
    } else {
      method = 'post'
      const resultPut = await likePostService(postId, method)
      if (resultPut?.status === 'ok') {
        fetchPosts()
      }
    }
  }

  const onClickDislikePost = async () => {
    let method = ''
    if (ownerDislikes === 1) {
      method = 'delete'
      const resultDelete = await dislikePostService(postId, method)
      if (resultDelete?.status === 'ok') {
        fetchPosts()
      }
    } else {
      method = 'post'
      const resultPut = await dislikePostService(postId, method)
      if (resultPut?.status === 'ok') {
        fetchPosts()
      }
    }
  }

  const onClickReportPost = async () => {
    let method = ''
    if (ownerReports === 1) {
      method = 'delete'
      const resultDelete = await reportPostService(postId, method)
      if (resultDelete?.status === 'ok') {
        fetchPosts()
      }
    } else {
      method = 'post'
      const resultPut = await reportPostService(postId, method)
      if (resultPut?.status === 'ok') {
        fetchPosts()
      }
    }
  }

  const onClickEditPost = () => {
    navigate(`/posts/${postId}`)
  }
  const onClickDeletePost = async () => {
    await deletePostService(postId)
  }

  return (

    <div className='div-footer-post'>

      <div className='div-like-footer-post'>
        <button className='button-like-footer-post'><img src={likeOrLikeOn} alt='like image button' onClick={onClickLikePost} title='Me gusta' />
        </button>
        <span className='span-countlikes-footer-post'>{countLikes}</span>
      </div>
      <button className='button-dislike-footer-post' title='No me gusta'> <img src={disLikeOrDislikeOn} alt='dislike image button' onClick={onClickDislikePost} /></button>
      <div className='div-comment-footer-post'>
        <button className='button-comment-footer-post' title='Comentarios'>
          <img src={comment} alt='comment image button' />
        </button><span className='span-countcomments-footer-post'>{countComments}</span>
      </div>
      <button className='button-report-footer-post' title='Reportar'>
        <img src={reportOrReportOn} alt='report image button' onClick={onClickReportPost} />
      </button>
      <button className='button-report-footer-post' title='Editar' hidden={showEditDeleteButtons}>
        <img src={editButton} alt='report image button' onClick={onClickEditPost} />
      </button>
      <button className='button-report-footer-post' title='Borrar' hidden={showEditDeleteButtons}>
        <img src={deleteButton} alt='report image button' onClick={onClickDeletePost} />
      </button>

    </div>
  )
}

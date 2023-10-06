import './PostFooterComponent.css'
import like from '../../../assets/post/button_like.svg'
import likeOn from '../../../assets/post/button_like_on.svg'
import dislike from '../../../assets/post/button_dislike.svg'
import dislikeOn from '../../../assets/post/button_dislike_on.svg'
import comment from '../../../assets/post/button_comments.svg'
import report from '../../../assets/post/button_report.svg'
import { dislikePostService, likePostService } from '../../../services/postService'

export const PostFooterComponent = ({ fetchPosts, postId, ownerLikes, ownerDislikes, countLikes, countComments }) => {
  let likeOrLikeOn = like
  let disLikeOrDislikeOn = dislike

  if (ownerLikes) {
    likeOrLikeOn = likeOn
  }
  if (ownerDislikes) {
    disLikeOrDislikeOn = dislikeOn
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

  return (
    <div className='div-footer-post'>
      <div className='div-like-footer-post'>
        <button className='button-like-footer-post'><img src={likeOrLikeOn} alt='like image button' onClick={onClickLikePost} /></button><span className='span-countlikes-footer-post'>{countLikes}</span>
      </div>
      <button className='button-dislike-footer-post'> <img src={disLikeOrDislikeOn} alt='dislike image button' onClick={onClickDislikePost} /></button>
      <div className='div-comment-footer-post'>
        <button className='button-comment-footer-post'><img src={comment} alt='comment image button' /></button><span className='span-countcomments-footer-post'>{countComments}</span>
      </div>
      <button className='button-report-footer-post'><img src={report} alt='report image button' /></button>
    </div>
  )
}

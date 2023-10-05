import './PostFooterComponent.css'
import like from '../../../assets/post/button_like.svg'
import likeOn from '../../../assets/post/button_like_on.svg'
import dislike from '../../../assets/post/button_dislike.svg'
import comment from '../../../assets/post/button_comments.svg'
import report from '../../../assets/post/button_report.svg'
import { likePostService } from '../../../services/postService'
import { toastifySuccess, toastifyWarning } from '../../../utils/Toastify/Toastify'
import { useState } from 'react'

export const PostFooterComponent = ({ fetchPosts, postId, ownerLikes, countLikes, countComments }) => {
  const [togle, setTogle] = useState(false)
  let likeOrLikeOn = like

  if (!togle) {
    likeOrLikeOn = likeOn
  }

  const onClickLikePost = async () => {
    let method = ''

    if (ownerLikes === 1) {
      method = 'delete'
      const resultDelete = await likePostService(postId, method)
      if (resultDelete?.status === 'ok') {
        fetchPosts()

        setTogle(true)
      }
    } else {
      method = 'post'
      const resultPut = await likePostService(postId, method)
      if (resultPut?.status === 'ok') {
        fetchPosts()
        setTogle(false)
      }
    }
  }

  return (
    <div className='div-footer-post'>
      <div className='div-like-footer-post'>
        <button className='button-like-footer-post'><img src={likeOrLikeOn} alt='like image button' onClick={onClickLikePost} /></button><span className='span-countlikes-footer-post'>{countLikes}</span>
      </div>
      <button className='button-dislike-footer-post'> <img src={dislike} alt='dislike image button' /></button>
      <div className='div-comment-footer-post'>
        <button className='button-comment-footer-post'><img src={comment} alt='comment image button' /> </button><span className='span-countcomments-footer-post'>{countComments}</span>
      </div>
      <button className='button-report-footer-post'><img src={report} alt='report image button' /></button>
    </div>
  )
}

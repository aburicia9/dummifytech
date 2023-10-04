import './PostFooterComponent.css'
import like from '../../../assets/post/button_like.svg'
import dislike from '../../../assets/post/button_dislike.svg'
import comment from '../../../assets/post/button_comments.svg'
import report from '../../../assets/post/button_report.svg'

export const PostFooterComponent = ({ countLikes, countComments }) => {
  return (
    <div className='div-footer-post'>
      <div className='div-like-footer-post'>
        <button className='button-like-footer-post'><img src={like} alt='like image button' /></button><span className='span-countlikes-footer-post'>{countLikes}</span>
      </div>
      <button className='button-dislike-footer-post'> <img src={dislike} alt='dislike image button' /></button>
      <div className='div-comment-footer-post'>
        <button className='button-comment-footer-post'><img src={comment} alt='comment image button' /> </button><span className='span-countcomments-footer-post'>{countComments}</span>
      </div>
      <button className='button-report-footer-post'><img src={report} alt='report image button' /></button>
    </div>
  )
}

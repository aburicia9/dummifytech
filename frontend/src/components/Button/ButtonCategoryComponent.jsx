import './ButtonCategoryComponent.css'

export const ButtonCategoryComponent = ({ className, onClick, buttonName }) => {
  return (
    <button className={className} onClick={onClick} href='#'><span className='name-button-category'>{buttonName}</span></button>
  )
}

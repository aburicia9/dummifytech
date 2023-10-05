import './ButtonCategoryComponent.css'
import show from '../../assets/categories/button_show_categories.svg'
import hide from '../../assets/categories/button_hide_categories.svg'

export const ButtonCategoryComponent = ({ className, onClick, buttonName, showHide }) => {
  return (
    <button className='button-category' onClick={onClick} href='#'>
      <span className='name-button-category'>{buttonName}</span>
      <img className='img-hide-button-category' src={showHide ? hide : show} alt='hide category' />
    </button>
  )
}

import './ButtonComponent.css'

export const ButtonComponent = ({ handleOnClick, buttonName }) => {
  return (
    <button className='button-generic' onClick={handleOnClick}> {buttonName}</button>
  )
}

import './ButtonComponent.css'

export const ButtonComponent = ({ handleOnClick, buttonName, className = 'button-generic' }) => {
  return (
    <button className={className} onClick={handleOnClick}> {buttonName}</button>
  )
}

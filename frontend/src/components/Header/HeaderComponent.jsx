import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo/logo.svg'
import './HeaderComponent.css'
import search from '../../assets/header/search.svg'
import { ButtonComponent } from '../Button/ButtonComponent'

export const HeaderComponent = ({ isSearchDisabled }) => {
  const navigate = useNavigate()

  const handleOnClickRegister = (event) => {
    event.preventDefault()
    navigate('/register')
  }

  const handleOnClickHome = (event) => {
    event.preventDefault()
    navigate('/')
  }

  const handleOnClickLogin = (event) => {
    event.preventDefault()
    navigate('/login')
  }
  const handleOnClickSearch = (event) => {
    event.preventDefault()
  }
  return (
    <>
      <header className='header'>

        <img className='img-logo-header' src={logo} alt='Logo dummifytech' onClick={handleOnClickHome} />

        <form className='form-search-header'>
          <div className='div-search-header'>
            <input className='input-search-header' disabled={isSearchDisabled} type='text' placeholder='   Busca tu post...' />
            <button className='button-search-header' disabled={isSearchDisabled} onClick={handleOnClickSearch}><img src={search} alt='image search' className='img-search-header' /></button>
          </div>
        </form>
        <div className='div-button-users-header'>

          <ButtonComponent handleOnClick={handleOnClickRegister} buttonName='Registrarse' />

          <ButtonComponent handleOnClick={handleOnClickLogin} buttonName='Iniciar sesion' />
        </div>
      </header>
    </>
  )
}

import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo/logo.svg'
import './HeaderComponent.css'
import search from '../../assets/header/search.svg'
import { ButtonComponent } from '../Button/ButtonComponent'
import avatarUser from '../../assets/users/login.svg'

export const HeaderComponent = ({ isSearchDisabled, isUserLogued = false }) => {
  const navigate = useNavigate()
  let divSearchHeader = 'div-search-header'

  if (isUserLogued === true) {
    divSearchHeader = divSearchHeader + '-logued'
  }

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
        <img
          className='img-logo-header'
          src={logo}
          alt='Logo dummifytech'
          onClick={handleOnClickHome}
        />

        <form className='form-search-header'>
          <div className={divSearchHeader}>
            <input
              className='input-search-header'
              disabled={isSearchDisabled}
              type='text'
              placeholder='   Busca tu post...'
            />
            <button
              className='button-search-header'
              disabled={isSearchDisabled}
              onClick={handleOnClickSearch}
            >
              <img
                src={search}
                alt='image search'
                className='img-search-header'
              />
            </button>
          </div>
        </form>
        {isUserLogued
          ? (
            <button className='button-avatar-user-header'>
              <img src={avatarUser} alt='avatar usuario' />
            </button>
            )
          : (
            <div className='div-button-users-header'>
              <ButtonComponent
                handleOnClick={handleOnClickRegister}
                buttonName='Registrarse'
              />
              <ButtonComponent
                handleOnClick={handleOnClickLogin}
                buttonName='Iniciar sesion'
              />
            </div>
            )}
      </header>
    </>
  )
}

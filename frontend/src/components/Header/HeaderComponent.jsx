import { useNavigate } from 'react-router-dom'
import './HeaderComponent.css'
import search from '../../assets/header/search.svg'
import { ButtonComponent } from '../Button/ButtonComponent'
import avatarUser from '../../assets/users/login.svg'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/posts/usePosts'
import { useState } from 'react'

export const HeaderComponent = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { setSearchParams } = usePosts()
  const [keyword, setKeyword] = useState('')

  const handleOnClickRegister = (event) => {
    event.preventDefault()
    navigate('/register')
  }

  const handleOnClickLogin = (event) => {
    event.preventDefault()
    navigate('/login')
  }

  const onSubmitFormSearch = (event) => {
    event.preventDefault()
    setSearchParams(new URLSearchParams({ keyword }))
  }

  const onChangeSearch = (event) => {
    setKeyword(event.target.value)
  }
  return (
    <>
      <header className='header'>

        <form className='form-search-header' onSubmit={onSubmitFormSearch}>
          <div className='div-form-header'>
            <input
              className='input-search-header'
              onChange={onChangeSearch}
              disabled={!isAuthenticated}
              type='text'
              placeholder='Busca tu post...'
            />
            <button
              className='button-search-header'
              disabled={!isAuthenticated}
            >
              <img
                src={search}
                alt='image search'
                className='img-search-header'
              />
            </button>
          </div>
        </form>
        {isAuthenticated
          ? (
            <div className='div-button-users-header'>
              <button className='button-avatar-user-header'>
                <img src={avatarUser} alt='avatar usuario' />
              </button>
            </div>
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

import { useNavigate } from 'react-router-dom'
import './HeaderComponent.css'
import search from '../../assets/header/search.svg'
import logoutIcon from '../../assets/header/logout.svg'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/posts/usePosts'
import { useState } from 'react'
import { toastifySuccess } from '../../utils/Toastify/Toastify'
import { CircleMenu, CircleMenuItem, TooltipPlacement } from 'react-circular-menu'
import registerUser from '../../assets/users/register.svg'
import loginUser from '../../assets/users/login.svg'

export const HeaderComponent = () => {
  const { authLogout } = useAuth()
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

  const onClicklogout = (event) => {
    event.preventDefault()
    authLogout()
    toastifySuccess('¡Sesión Cerrada!')
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
              <CircleMenu
                startAngle={180}
                rotationAngle={-180}
                itemSize={2}
                radius={5}
                rotationAngleInclusive={false}
              >
                <CircleMenuItem
                  onClick={onClicklogout}
                  tooltip='logout'
                  tooltipPlacement={TooltipPlacement.Bottom}
                >
                  <img src={logoutIcon} alt='' />
                </CircleMenuItem>

              </CircleMenu>
              {/* <button className='button-logout-header' onClick={onClicklogout}>
                <img src={logoutIcon} alt='icono logout' />
              </button>
              <button className='button-avatar-user-header'>
                <img src={avatarUser} alt='avatar usuario' />
              </button> */}
            </div>
            )
          : (
            <div className='div-button-users-header'>
              <CircleMenu
                startAngle={180}
                rotationAngle={-180}
                itemSize={2}
                radius={5}
                rotationAngleInclusive={false}
              >
                <CircleMenuItem
                  onClick={handleOnClickLogin}
                  tooltip='Iniciar sesion'
                  tooltipPlacement={TooltipPlacement.Bottom}
                >
                  <img src={loginUser} alt='boton para iniciar sesion' />
                </CircleMenuItem>
                <CircleMenuItem
                  onClick={handleOnClickRegister}
                  tooltip='Registrarse'
                  tooltipPlacement={TooltipPlacement.Bottom}
                >
                  <img src={registerUser} alt='boton para registrar usuario' />
                </CircleMenuItem>

              </CircleMenu>
              {/* <ButtonComponent
                handleOnClick={handleOnClickRegister}
                buttonName='Registrarse'
              />
              <ButtonComponent
                handleOnClick={handleOnClickLogin}
                buttonName='Iniciar sesion'
              /> */}
            </div>
            )}
      </header>
    </>
  )
}

import { Link } from 'react-router-dom'
import './MenuCircularComponent.css'
import registerUser from '../../assets/users/register.svg'
import loginUser from '../../assets/users/login.svg'
import menu from '../../assets/users/menu.svg'
import menuOpen from '../../assets/users/menuOpen.svg'
import { useState } from 'react'

export const MenuCircularNoAuthComponent = () => {
  const [hideShow, setHideShow] = useState(true)

  const onClickMenuCircular = () => {
    if (hideShow === false) {
      setHideShow(true)
    } else {
      setHideShow(false)
    }
  }
  return (
    <div>
      <ul className='ul-menu-circular-component'>

        <li>
          <Link to='/register'>
            <button
              className='button-menu'
              title='Registrarse'
              hidden={hideShow}
            >
              <img src={registerUser} alt='boton para registrar un usuario' className='img-search-header' />
            </button>
          </Link>
        </li>
        <li>
          <Link to='/login'>
            <button
              className='button-menu'
              title='Iniciar Sesion'
              hidden={hideShow}
            >
              <img src={loginUser} alt='boton para iniciar sesion' className='img-search-header' />
            </button>
          </Link>
        </li>
        <li>
          {hideShow
            ? (
              <button
                className='button-first-menu-circular-component'
                onClick={onClickMenuCircular}
              >
                <img src={menu} alt='imagen para el menu' />
              </button>
              )
            : (
              <button
                className='button-second-menu-circular-component'
                onClick={onClickMenuCircular}
              >
                <img src={menuOpen} alt='imagen para el menu abierto' />
              </button>
              )}
        </li>

      </ul>
    </div>
  )
}

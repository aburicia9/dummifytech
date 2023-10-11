/* eslint-disable react/jsx-handler-names */
import { useNavigate } from 'react-router-dom'
import './MenuCircularComponent.css'
import menu from '../../assets/users/menu.svg'
import menuOpen from '../../assets/users/menuOpen.svg'
import menuProfile from '../../assets/users/userProfile.svg'
import menuOwnerPosts from '../../assets/users/menuOwnerPosts.svg'
import menuLogOut from '../../assets/header/logout.svg'
import { v4 as uuidv4 } from 'uuid'
import menuReports from '../../assets/users/menuReports.svg'
import menuUsers from '../../assets/users/menuUsers.svg'
import menuCategories from '../../assets/users/menuCategories.svg'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { toastifySuccess } from '../../utils/Toastify/Toastify'

export const MenuCircularAuthComponent = () => {
  const [hideShow, setHideShow] = useState(true)
  const { authLogout, authUser } = useAuth()
  const [renderMenu, setRenderMenu] = useState([])
  const navigate = useNavigate()

  const onClickUserProfile = (event) => {
    event.preventDefault()
    navigate('/users/profile')
  }
  const onClickOwnerPosts = (event) => {
    event.preventDefault()
    navigate('/users/myposts')
  }
  const onClicklogout = (event) => {
    event.preventDefault()
    authLogout()
    toastifySuccess('¡Sesión Cerrada!')
  }

  const onClickReports = (event) => {
    event.preventDefault()
    navigate('/posts/reports')
  }

  const onClickReqCategories = (event) => {
    event.preventDefault()
    navigate('/categories/request')
  }
  const onClickUsers = (event) => {
    event.preventDefault()
    navigate('/users')
  }

  const menuOptions = {
    normal: [

      {
        id: uuidv4(),
        title: 'Perfil de usuario',
        svg: menuProfile,
        onClick: onClickUserProfile
      },
      {
        id: uuidv4(),
        title: 'Mis publicaciones',
        svg: menuOwnerPosts,
        onClick: onClickOwnerPosts
      },
      {
        id: uuidv4(),
        title: 'Peticiones de categorias',
        svg: menuCategories,
        onClick: onClickReqCategories
      },
      {
        id: uuidv4(),
        title: 'Cerrar sesión',
        svg: menuLogOut,
        onClick: onClicklogout
      }

    ],
    moderator: [

      {
        id: uuidv4(),
        title: 'Perfil de usuario',
        svg: menuProfile,
        onClick: onClickUserProfile
      },
      {
        id: uuidv4(),
        title: 'Mis publicaciones',
        svg: menuOwnerPosts,
        onClick: onClickOwnerPosts
      },
      {
        id: uuidv4(),
        title: 'Reports',
        svg: menuReports,
        onClick: onClickReports
      },
      {
        id: uuidv4(),
        title: 'Peticiones de categorias',
        svg: menuCategories,
        onClick: onClickReqCategories
      },
      {
        id: uuidv4(),
        title: 'Cerrar sesión',
        svg: menuLogOut,
        onClick: onClicklogout
      }

    ],
    admin: [
      {
        id: uuidv4(),
        title: 'Perfil de usuario',
        svg: menuProfile,
        onClick: onClickUserProfile
      },
      {
        id: uuidv4(),
        title: 'Mis publicaciones',
        svg: menuOwnerPosts,
        onClick: onClickOwnerPosts
      },
      {
        id: uuidv4(),
        title: 'Reports',
        svg: menuReports,
        onClick: onClickReports
      },
      {
        id: uuidv4(),
        title: 'Peticiones de categorias',
        svg: menuCategories,
        onClick: onClickReqCategories
      },
      {
        id: uuidv4(),
        title: 'Usuarios',
        svg: menuUsers,
        onClick: onClickUsers
      },
      {
        id: uuidv4(),
        title: 'Cerrar sesión',
        svg: menuLogOut,
        onClick: onClicklogout
      }
    ]
  }

  useEffect(() => {
    if (authUser) {
      setRenderMenu(menuOptions[authUser.role])
    }
  }, [authUser])

  const onClickMenuCircular = () => {
    if (hideShow === false) {
      setHideShow(true)
    } else {
      setHideShow(false)
    }
  }
  return (
    <>
      <ul className='ul-menu-circular-component'>
        {
          renderMenu.map((menu) => (
            <li key={menu.id}>
              <button
                hidden={hideShow}
                className='button-menu'
                onClick={menu.onClick}
                title={menu.title}
              >
                <img
                  src={menu.svg}
                  alt='image search'
                  className='img-search-header'
                />
              </button>
            </li>
          ))
        }
      </ul>
      <div className='div-menu-circular-component'>
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
      </div>
    </>

  )
}

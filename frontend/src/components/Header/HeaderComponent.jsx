// Importamos los compontentes.
import { NavLink } from 'react-router-dom'

// Importamos iconos
import RegisterIcon from '../../assets/header/register.svg'
import LoginIcon from '../../assets/header/login.svg'
import LogoutIcon from '../../assets/header/logout.svg'
import AvatarUser from '../../assets/header/user_login.svg'
import Logo from '../../assets/logo/logo.svg'
import Search from '../../assets/post/search_post.svg'

// Importamos estilos
import './HeaderComponent.css'

export const HeaderComponent = () => {
  return (
    <header className='header-home'>
      <NavLink to='/'><img src={Logo} alt='Logo dummifytech' className='logo-home' /></NavLink>
      <form>
        <input type='search-post' placeholder='Busca tu post...🔍' />
      </form>
      <div className='hader-user'>
        <NavLink to='/'>REGISTRO</NavLink>
        {' | '}
        <NavLink to='/'>LOGIN</NavLink>
      </div>
    </header>
  )
}

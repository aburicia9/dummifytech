import { useState } from 'react'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import './LoginPage.css'
import { loginUserService } from '../../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/Layout/Layout'
import { toastifyForm } from '../../utils/Toastify/Toastify'
import { useAuth } from '../../hooks/useAuthHook'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [loading, setLoading] = useState(false)
  const { authLogin } = useAuth()

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const resetForm = () => {
    setEmail()
    setPassword()
  }

  const handleOnClick = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const result = await authLogin({ email, password })

      toastifyForm(result)

      if (result.status === 'ok') {
        resetForm()
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout isSearchDisabled isSubcategoryDisabled>
      <div className='div-login'>
        <form className='form-login'>
          <h2 className='title-login'>Login</h2>
          <label htmlFor='email'>Correo electronico: </label>
          <input
            type='email'
            id='email'
            onChange={handleOnChangeEmail}
            value={email}
          />
          <label htmlFor='password'>Contraseña: </label>
          <input
            type='password'
            id='password'
            onChange={handleOnChangePassword}
            value={password}
          />
          <ButtonComponent
            className='button-login'
            buttonName='Iniciar Sesión'
            handleOnClick={handleOnClick}
          />
          <div className='div-p-login'>
            <p>
              Hay una primera vez para todo{' '}
              <Link className='link-register-login' to='/register'>
                ¡Registrate!
              </Link>
            </p>
            <p>
              ¿Has olvidado la{' '}
              <Link
                className='link-recovery-password-login'
                to='/recovery-password'
              >
                contraseña
              </Link>
              ?
            </p>
          </div>
        </form>
      </div>
    </Layout>
  )
}

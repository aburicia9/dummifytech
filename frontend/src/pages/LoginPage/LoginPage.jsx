import { useState } from 'react'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from '../../components/Layout/Layout'
import { toastifyForm } from '../../utils/Toastify/Toastify'
import { useAuth } from '../../hooks/useAuth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('prueba')
  const [email, setEmail] = useState('prueba@prueba.com')
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
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout isSearchDisabled isSubcategoryDisabled>
      <div className='div-login'>
        <form className='form-login'>
          <h2 className='title-login'>Iniciar sesion</h2>
          <div className='div-email-login'>
            <label className='label-login' htmlFor='email'>Correo electronico: </label>
            <input
              className='input-login'
              type='email'
              id='email'
              onChange={handleOnChangeEmail}
              value={email}
            />
          </div>
          <div className='div-password-login'>
            <label className='label-login' htmlFor='password'>Contraseña: </label>
            <input
              className='input-login'
              type='password'
              id='password'
              onChange={handleOnChangePassword}
              value={password}
            />
          </div>
          <div className='div-p-login'>
            <ButtonComponent
              className='button-generic large'
              buttonName='Iniciar Sesión'
              handleOnClick={handleOnClick}
            />
            <p>
              Para todo hay una primera vez{' '}
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

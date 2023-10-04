import { useState } from 'react'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import './LoginPage.css'
import { loginUserService } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components/Layout/Layout'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleOnClick = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const result = await loginUserService({ email, password })

      resetForm()

      if (result.status === 'ok') {
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout isSearchDisabled>
      <form>
        <h2>Login</h2>
        <label htmlFor='email'>Correo electronico: </label>
        <input type='email' id='email' onChange={handleOnChangeEmail} value={email} />
        <label htmlFor='password'>Contraseña: </label>
        <input type='password' id='password' onChange={handleOnChangePassword} value={password} />
        <ButtonComponent buttonName='Ingresar' handleOnClick={handleOnClick} />
      </form>

      <p>Hay una primera vez para todo<a href='/register'> ¡Registrate!</a></p>
      <p>¿Has olvidado la <a href='#'>contraseña</a>?</p>
    </Layout>
  )
}

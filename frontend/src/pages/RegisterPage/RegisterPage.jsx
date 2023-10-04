import { useState } from 'react'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import './RegisterPage.css'
import { createUserService } from '../../services/authService'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnChangeFullName = (event) => {
    setFullName(event.target.value)
  }

  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleOnChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value)
  }

  const resetForm = () => {
    setFullName('')
    setUsername('')
    setEmail('')
    setPassword('')
    setRepeatPassword('')
  }

  const handleOnClick = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      if (password !== repeatPassword) {
        console.log('Las contraseñas no coinciden')
      }
      const resutl = await createUserService({ username, email, password, fullName })

      if (resutl.status === 'ok') {
        resetForm()
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form>
        <h2>Formulario de registro</h2>
        <label htmlFor='fullName'>Nombre completo: </label>
        <input type='text' id='fullName' onChange={handleOnChangeFullName} value={fullName} />
        <label htmlFor='username'>Usuario: </label>
        <input type='text' id='username' onChange={handleOnChangeUsername} value={username} />
        <label htmlFor='email'>Correo electronico: </label>
        <input type='email' id='email' onChange={handleOnChangeEmail} value={email} />
        <label htmlFor='password'>Contraseña: </label>
        <input type='password' id='password' onChange={handleOnChangePassword} value={password} />
        <label htmlFor='repeatPassword'>Repite la contraseña: </label>
        <input type='password' id='repeatPassword' onChange={handleOnChangeRepeatPassword} value={repeatPassword} />
        <ButtonComponent buttonName='Registrarse' handleOnClick={handleOnClick} />

      </form>
    </>
  )
}

import { useState } from 'react'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import './RegisterPage.css'
import { createUserService } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components/Layout/Layout'
import { toastifyForm, toastifyWarning } from '../../utils/Toastify/Toastify'

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
        toastifyWarning('Las contraseñas no coinciden')
        return
      }
      const result = await createUserService({ username, email, password, fullName })

      toastifyForm(result)

      if (result.status === 'ok') {
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
    <Layout isSearchDisabled isSubcategoryDisabled>
      <div className='div-register'>
        <form className='form-register'>
          <h2 className='title-register'>Formulario de registro</h2>
          <label className='label-register' htmlFor='fullName'>Nombre completo: </label>
          <input className='input-register' type='text' id='fullName' onChange={handleOnChangeFullName} value={fullName} />
          <label className='label-register' htmlFor='username'>Usuario: </label>
          <input className='input-register' type='text' id='username' onChange={handleOnChangeUsername} value={username} />
          <label className='label-register' htmlFor='email'>Correo electrónico: </label>
          <input className='input-register' type='email' id='email' onChange={handleOnChangeEmail} value={email} />
          <label className='label-register' htmlFor='password'>Contraseña: </label>
          <input className='input-register' type='password' id='password' onChange={handleOnChangePassword} value={password} />
          <label className='label-register' htmlFor='repeatPassword'>Repite la contraseña: </label>
          <input className='input-register' type='password' id='repeatPassword' onChange={handleOnChangeRepeatPassword} value={repeatPassword} />
          <ButtonComponent className='button-register' buttonName='Registrarse' handleOnClick={handleOnClick} />
        </form>
      </div>
    </Layout>
  )
}

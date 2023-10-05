import { useNavigate } from 'react-router-dom'
import { ButtonComponent } from '../../components/Button/ButtonComponent'
import { Layout } from '../../components/Layout/Layout'
import './RecoveryPasswordPage.css'
import { useState } from 'react'
import { updateForgetPasswordUserService } from '../../services/authService'

export const RecoveryPasswordPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleOnChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const resetForm = () => {
    setEmail('')
    setUsername('')
  }

  const handleOnClick = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      const result = await updateForgetPasswordUserService({ username, email })
      console.log(result)

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
    <Layout isSearchDisabled isSubcategoryDisabled>
      <div className='div-recovery-password'>
        <form className='form-recovery-password'>
          <h2 className='title-recogery-password'>Recupera tu contraseña</h2>
          <label htmlFor='username'>Nombre de usuario: </label>
          <input type='text' id='username' onChange={handleOnChangeUsername} value={username} />
          <label htmlFor='email'>Correo electronico: </label>
          <input type='email' id='email' onChange={handleOnChangeEmail} value={email} />
          <ButtonComponent className='button-recovery-password' buttonName='Recuperar' handleOnClick={handleOnClick} />
        </form>
      </div>
    </Layout>
  )
}

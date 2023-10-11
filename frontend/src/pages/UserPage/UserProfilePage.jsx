import { Layout } from '../../components/Layout/Layout'
import './UserProfilePage.css'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { toastifyForm, toastifyWarning } from '../../utils/Toastify/Toastify'
import { useNavigate } from 'react-router'
import { updateAvatarUserService, updateFullNameUserService, updatePasswordUserService } from '../../services/authService'
const baseApiURL = import.meta.env.VITE_API_URL

export const UserProfilePage = () => {
  const { authUser, setAuthUser } = useAuth()

  const navigate = useNavigate()
  const [inputFullName, setInputFullName] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState(' ')
  const [comparePassword, setComparePassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleOnChangeFullName = (event) => {
    setInputFullName(event.target.value)
  }
  const handleOnChangeOldPassword = (event) => {
    setOldPassword(event.target.value)
  }

  const handleOnChangeNewPassword = (event) => {
    setNewPassword(event.target.value)
  }

  const handleOnChangeComparePassword = (event) => {
    setComparePassword(event.target.value)
  }

  const resetForm = () => {
    setInputFullName('')
    setOldPassword('')
    setNewPassword('')
    setComparePassword('')
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleOnClickUpdatePerfil = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)

      if (selectedFile) {
        const formData = new FormData()
        formData.append('avatar', selectedFile)

        const result = await updateAvatarUserService(formData)

        if (result.status === 'ok') {
          toastifyForm(result)
          setAuthUser({
            ...authUser,
            avatar: result.data.avatarName
          })
          resetForm()
          navigate('/users/profile')
        }
      }

      if (inputFullName) {
        const result = await updateFullNameUserService(inputFullName)

        if (result.status === 'ok') {
          toastifyForm(result)
          setAuthUser({
            ...authUser,
            fullName: inputFullName
          })
          resetForm()
          navigate('/users/profile')
        } else {
          toastifyForm(result)
        }
      }

      if (oldPassword) {
        if (newPassword !== comparePassword) {
          toastifyWarning('Las contraseñas no coinciden')
          return
        }

        const result = await updatePasswordUserService(oldPassword, newPassword)
        toastifyForm(result)

        if (result.status === 'ok') {
          toastifyForm(result)
          resetForm()
          navigate('/users/profile')
        } else {
          toastifyForm(result)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !authUser) {
    return (
      <Layout>
        <div className='div-user-profile'>
          <div className='form-user-profile'>
            <h2 className='title-user-profile'>Perfil de Usuario</h2>
            <h3 className='title-user-profile'>Cargando...</h3>
          </div>
        </div>
      </Layout>
    )
  }

  const { fullName, username, email, avatar } = authUser

  return (
    <Layout>
      <div className='div-user-profile'>
        <form className='form-user-profile'>
          <h2 className='title-user-profile'>Perfil de Usuario</h2>

          <div className='div-avatar-profile'>
            <img className='image-edit-profile' src={`${baseApiURL}/avatar/${avatar}`} alt='' />
            <input type='file' onChange={handleFileChange} />
          </div>
          <div>
            <label className='label-user-profile' htmlFor='fullName'>Nombre Completo:</label>
            <input onChange={handleOnChangeFullName} className='input-user-profile' id='fullName' type='text' placeholder={fullName} />
          </div>
          <div>
            <label className='label-user-profile' htmlFor='username'>Nombre usuario:</label>
            <input className='input-user-profile' id='username' type='text' placeholder={username} disabled />
          </div>
          <div>
            <label className='label-user-profile' htmlFor='email'>Correo electrónico</label>
            <input className='input-user-profile' id='email' type='email' placeholder={email} disabled />
          </div>
          <div>
            <label className='label-user-profile' htmlFor=''>Contraseña actual:</label>
            <input className='input-user-profile' type='password' id='password' placeholder='*****' onChange={handleOnChangeOldPassword} />
            <label className='label-user-profile' htmlFor=''>Introduce nueva Contraseña:</label>
            <input className='input-user-profile' type='password' id='password' placeholder='Nueva contraseña' onChange={handleOnChangeNewPassword} />
            <label className='label-user-profile' htmlFor=''>Repite la nueva Contraseña:</label>
            <input className='input-user-profile' type='password' id='password' placeholder='Repite nueva contraseña' onChange={handleOnChangeComparePassword} />

          </div>
          <button className='button-user-profile' onClick={handleOnClickUpdatePerfil}>Guardar Cambios</button>
          <button className='button-user-profile'>Eliminar Perfil</button>
        </form>

      </div>
    </Layout>
  )
}

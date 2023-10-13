import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import changeRoleSvg from '../../assets/users/changeRole.svg'
import deleteUserSvg from '../../assets/post/button_delete.svg'
import './UsersRolePage.css'
import { deleteUserService, listAllUsersService, updateUserRoleService } from '../../services/authService'
import { useParams } from 'react-router-dom'
import { toastifyConfirm, toastifyError, toastifyForm } from '../../utils/Toastify/Toastify'
import { toast } from 'react-toastify'
import { TitleCategory } from '../../components/titleCategory/titleCategory'

const baseApiURL = import.meta.env.VITE_API_URL

export const UsersRolePage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)

      const body = await listAllUsersService()
      setUsers(body.data.users)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Layout>
      <div className='div-users-change'>
        <TitleCategory />
        <ul className='ul-users'>
          {users.map((user) => (
            <UserList
              key={user.id}
              user={user}
              fetchUsers={fetchUsers}
            />
          ))}
        </ul>
      </div>
    </Layout>
  )
}
function UserList ({ user, fetchUsers }) {
  const params = useParams()
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOnChangeRole = (event) => {
    setRole(event.target.value)
  }

  const handleOnClickChangeRole = async (event) => {
    event.preventDefault()
    const userId = user.id

    try {
      setLoading(true)

      const body = await updateUserRoleService({ userId, role })

      if (body.status === 'ok') {
        fetchUsers()
        setRole(role[0])
        toastifyForm(body)
      }
      if (body.status === 'error') {
        toastifyForm(body)
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOnClickDeleteUser = async (event) => {
    try {
      event.preventDefault()
      const userId = user.id
      const deleteUser = async () => {
        try {
          const result = await deleteUserService(userId)

          if (result.status === 'ok') {
            toast.dismiss()
            toastifyForm(result)
            await fetchUsers()
          } else {
            toast.dismiss()
            toastifyForm(result)
          }
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
      toastifyConfirm(
        '¿Estas seguro que quieres eliminar este usuario?',
        deleteUser
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <li className='li-users'>
      <section className='section-header-user'>
        <aside className='aside-header-list'>
          <img className='img-users-list' src={`${baseApiURL}/avatar/${user.avatar}`} alt='avatar del usuario' />
          <header className='header-user'>
            <span>Usuarios: {user.username}</span>
            <span>Rol: {user.role}</span>
          </header>
        </aside>
      </section>
      <article className='article-change'>
        <div className='div-line-aside' />
        <section className='role-menu'>
          <select
            id='role'
            className='menu-role-select'
            onChange={handleOnChangeRole}
            disabled={!!params?.userId}
            value={role}
          >
            <option value='' className='option-role'>Selecciona el rol</option>
            <option label='normal' value='normal' className='option-role' />
            <option label='moderador' value='moderator' className='option-role' />
            <option label='administrador' value='admin' className='option-role' />
          </select>
        </section>
        <div className='buttons-change'>
          <li>
            <button
              className='button'
              title='Actualizar'
              onClick={handleOnClickChangeRole}
            >
              <img src={changeRoleSvg} alt='boton para cambiar el rol' />
            </button>
          </li>
          <li>
            <button
              className='button'
              title='Borrar'
              onClick={handleOnClickDeleteUser}
            >
              <img src={deleteUserSvg} alt='boton para eliminar el usuario' />
            </button>
          </li>
        </div>
      </article>
    </li>
  )
}

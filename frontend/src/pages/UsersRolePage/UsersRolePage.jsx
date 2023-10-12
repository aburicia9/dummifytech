import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { useAuth } from '../../hooks/useAuth'
import './UsersRolePage.css'
import { listAllUsersService } from '../../services/authService'
const baseApiURL = import.meta.env.VITE_API_URL

export const UsersRolePage = () => {
  const { authUser } = useAuth()
  const [users, setUsers] = useState([])
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      let body = []
      if (isAuthenticated) {
        body = await listAllUsersService()
      }
      setUsers(body.data.users)

      return setUsers()
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
        <article className='article-users'>
          <ul className='ul-users'>
            {users.map((user) => (
              <UserInfo
                key={user.id}
              />
            ))}
          </ul>
        </article>
      </div>
    </Layout>
  )
}

function UserInfo ({ user, authUsers, setLoading, fetchUsers }) {
  return (
    <li key={user.id} className='li-users'>
      <aside className='aside-header-user'>
        <img className='img-users-list' src={`${baseApiURL}/avatar/${user.avatar}`} alt='avatar del usuario' />

      </aside>

    </li>
  )
}

import React, { useEffect } from 'react'
import { verificationOwnUserService } from '../../services/authService'
import { toastifyForm } from '../../utils/Toastify/Toastify'
import { useLocation } from 'react-router-dom'
import { Layout } from '../../components/Layout/Layout'
import "./VerificationUserPage.css"

export const VerificationUserPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await verificationOwnUserService(token)
        if (result.status === 'ok') {
          toastifyForm(result)
        } else if (result.status === 'error') {
          toastifyForm(result)
        }
      } catch (error) {
        console.error(error)
      }
    }

    verifyUser()
  }, [])

  return (
    <Layout>
      <section className='article-post'>
        <article className='section-post verification'>
          <h2>Verificación de Usuario</h2>
          <h3>Usuario confirmado</h3>
        </article>

      </section>

    </Layout>
  )
}

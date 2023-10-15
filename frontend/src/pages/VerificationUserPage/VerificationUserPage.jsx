import React, { useEffect, useState } from 'react'
import { verificationOwnUserService } from '../../services/authService'
import { useParams } from 'react-router-dom'
import { toastifyForm } from '../../utils/Toastify/Toastify'

export const VerificationUserPage = () => {
  const params = useParams()
  console.log(params)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await verificationOwnUserService(params.token)

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
    <div className='App'>
      <h2>Verificación de Usuario</h2>

      <h3>Usuario confirmado</h3>

    </div>
  )
}

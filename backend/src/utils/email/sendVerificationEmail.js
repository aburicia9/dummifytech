// Importamos los modelos.

import jwt from 'jsonwebtoken'
import { getTemplate, sendEmail } from './configEmail.js'

// Funcion controladora final que inserta un nuevo usuario.
export const sendVerificationEmail = async (email, username, code) => {
  try {
    // Creamos un token  para verificar si el usuario ha verificado el correo
    const tokenInfo = {
      email,
      code,
      username
    }
    // Generamos el token temporal para la verificacion
    const token = jwt.sign(tokenInfo, process.env.SECRET, { expiresIn: '30m' })
    // Obtenemos el template
    const template = getTemplate(username, token)

    // Enviamos el correo
    await sendEmail(email, 'Correo de verificacion de usuario', template)
  } catch (error) {
    console.log(error)
  }
}

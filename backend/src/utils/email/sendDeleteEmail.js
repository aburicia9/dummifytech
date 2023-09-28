// Importamos los modelos.
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { getTemplateDeleteConfig, sendDeleteConfig } from './configEmail.js'

// Funcion controladora final que inserta un nuevo usuario.
export const sendDeleteEmail = async (userId, type, contextEmail) => {
  console.log({ userId, type, contextEmail })
  try {
    const user = await selectUserByIdModel(userId)
    // Obtenemos el template
    const template = getTemplateDeleteConfig(user.username, type, contextEmail)

    // Enviamos el correo
    await sendDeleteConfig(user.email, 'Correo de verificacion de usuario', template)
  } catch (error) {
    console.error(error)
  }
}

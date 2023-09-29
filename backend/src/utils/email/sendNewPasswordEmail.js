import { getTemplateForgottenPasswordConfig, sendForgottenPasswordConfig } from './configEmail.js'

export const sendNewPasswordEmail = async (email, username, password) => {
  try {
    const template = getTemplateForgottenPasswordConfig(username, password)

    await sendForgottenPasswordConfig(email, 'Recuperación de contraseña.', template)
  } catch (error) {
    console.error(error)
  }
}

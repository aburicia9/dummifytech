import { getTemplateReqCategoryConfig, sendReqCategoryConfig } from './configEmail.js'

export const sendCategoryEmail = async (username, categoryName, categoryReason, userEmail) => {
  try {
    const template = getTemplateReqCategoryConfig(username, categoryName, categoryReason, userEmail)

    await sendReqCategoryConfig('Petición de una nueva categoria', template)
  } catch (error) {
    console.log(error)
  }
}

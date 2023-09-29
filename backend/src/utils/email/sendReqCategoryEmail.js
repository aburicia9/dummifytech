import { getTemplateResCategoryConfig, sendResCategoryConfig } from './configEmail.js'

export const sendReqCategoryEmail = async (email, username, categoryName, requestReason, accepted) => {
  try {
    const template = getTemplateResCategoryConfig(username, categoryName, requestReason, accepted)

    await sendResCategoryConfig(email, 'Peticion de categoria', template)
  } catch (error) {
    console.error(error)
  }
}

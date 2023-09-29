import { selectReqCategoriesByIdModel } from '../../models/categories/selectReqCategoriesByIdModel.js'
import { updateReqCategoryModel } from '../../models/categories/updateReqCategoryModel.js'
import { managementCategoryRequestError } from '../../services/errorService.js'
import { sendReqCategoryEmail } from '../../utils/email/sendReqCategoryEmail.js'

export const editReqCategoryController = async (req, res, next) => {
  try {
    const { statusReq, accepted } = req.body
    const { requestCategoryId } = req.params

    await updateReqCategoryModel(statusReq, accepted, requestCategoryId)
    const reqCategory = await selectReqCategoriesByIdModel(requestCategoryId)

    if (statusReq === 0) {
      managementCategoryRequestError()
    }
    if (accepted === 1) {
      const accepted = 'aceptada'
      const requestReason = 'La categoria cumple con los requesitos para ser aceptada. Gracias por su colaboracion'
      sendReqCategoryEmail(reqCategory.email, reqCategory.username, reqCategory.nameCategory, requestReason, accepted)
    } else if (accepted === 0) {
      const accepted = 'rechazada'
      const requestReason = 'La categoria no cumple con los requesitos para ser aceptada. Gracias por su colaboracion'
      sendReqCategoryEmail(reqCategory.email, reqCategory.username, reqCategory.nameCategory, requestReason, accepted)
    }

    res.send({
      status: 'ok',
      message: 'Peticion de categoria actualizada'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

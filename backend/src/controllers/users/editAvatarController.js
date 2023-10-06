// Importamos los modelos.
import { fromZodError } from 'zod-validation-error'
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { updateAvatarModel } from '../../models/users/updateAvatarModel.js'
import { editAvatarSchema } from '../../schemas/users/editAvatarSchema.js'

// Funciones que guardan y eliminan archivos.
import { deletePhoto } from '../../utils/deletePhoto.js'
import { savePhoto } from '../../utils/savePhoto.js'
import { validateSchema } from '../../schemas/validateSchema.js'
import { UPLOADS_DIRS } from '../../utils/constants.js'

// Funcion que edita el avatar del usuario.
export const editAvatarController = async (req, res, next) => {
  try {
    // Validamos los datos de files con joi. Si files no existe enviamos un objeto vacío.
    const result = await validateSchema(editAvatarSchema, req.files || {})
    if (!result.success) {
      throw fromZodError(result.error)
    }

    const user = await selectUserByIdModel(req.user.id)

    if (!user.avatar.includes('default')) {
      await deletePhoto(user.avatar, UPLOADS_DIRS.AVATAR)
    }

    const avatarName = await savePhoto(req.files.avatar, 150, UPLOADS_DIRS.AVATAR)

    await updateAvatarModel(avatarName, req.user.id)

    res.send({
      status: 'ok',
      message: 'Avatar actualizado',
      data: { avatarName }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// Importamos los modelos.
import { selectUserByIdModel } from '../../models/users/selectUserByIdModel.js'
import { updateAvatarModel } from '../../models/users/updateAvatarModel.js'

// Funciones que guardan y eliminan archivos.
import { deletePhoto } from '../../utils/deletePhoto.js'
import { savePhoto } from '../../utils/savePhoto.js'

// Funcion que edita el avatar del usuario.
export const editAvatarController = async (req, res, next) => {
  try {
    const user = await selectUserByIdModel(req.user.id)

    if (user.avatar) {
      await deletePhoto(user.avatar)
    }
    console.log(req.files)

    const avatarName = await savePhoto(req.files.avatar, 150)

    await updateAvatarModel(avatarName, req.user.id)

    res.send({
      status: 'ok',
      message: 'Usuario actualizado'
    })
  } catch (error) {
    next(error)
  }
}

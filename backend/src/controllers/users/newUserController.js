// Importamos los modelos.
import { insertUserModel } from '../../models/users/insertUserModel.js'

// Funcion controladora final que inserta un nuevo usuario.
export const newUserController = async (req, res, next) => {
  try {
    // Importamos los datos al body
    const { username, email, password, fullName } = req.body

    await insertUserModel(username, email, password, fullName)

    res.send({
      status: 'ok',
      message: 'Usuario creado ✅'
    })
  } catch (error) {
    next(error)
  }
}

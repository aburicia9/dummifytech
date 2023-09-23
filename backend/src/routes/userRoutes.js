// Importamos express y creamos un router.
import { Router } from 'express'
import { newUserController } from '../controllers/users/newUserController.js'
import { loginUserController } from '../controllers/users/loginUserController.js'
import { getUserController } from '../controllers/users/getUserController.js'
import { authUserController } from '../middlewares/authUserController.js'
import { editUserPasswordController } from '../controllers/users/editUserPasswordController.js'
import { editAvatarController } from '../controllers/users/editAvatarController.js'
import { editUserFullNameController } from '../controllers/users/editUserFullNameController.js'

const router = Router()

// Creamos la ruta. (endpoint)
router.post('/register', newUserController)

// Login de usuario
router.post('/login', loginUserController)

// Aqui empiezan las rutas de usuario existente
router.get('/users', authUserController, getUserController)

// Modificamos contraseña
router.put('/users/profile/password', authUserController, editUserPasswordController)

// Ruta del avatar usuario.
router.put('/users/profile/avatar', authUserController, editAvatarController)

// Ruta del fullname usuario.
router.put('/users/profile/fullname', authUserController, editUserFullNameController)

export default router

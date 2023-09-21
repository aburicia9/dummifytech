// Importamos express y creamos un router.
import { Router } from 'express'
import { newUserController } from '../controllers/users/newUserController.js'
import { loginUserController } from '../controllers/users/loginUserController.js'
import { getUserController } from '../controllers/users/getUserController.js'
import { authUserController } from '../middlewares/authUserController.js'
import { editUserPasswordController } from '../controllers/users/editUserPasswordController.js'

const router = Router()

// Creamos la ruta. (endpoint)
router.post('/users/register', newUserController)

// Login de usuario
router.post('/users/login', loginUserController)

// Aqui empiezan las rutas de usuario existente

router.get('/users', authUserController, getUserController)

// Modificamos contraseña

router.post('/users/perfil/password', authUserController, editUserPasswordController)

export default router

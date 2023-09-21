// Importamos express y creamos un router.
import { Router } from 'express'
import { newUserController } from '../controllers/users/newUserController.js'
import { loginUserController } from '../controllers/users/loginUserController.js'
const router = Router()

// Creamos la ruta. (endpoint)
router.post('/users/register', newUserController)

// Login de usuario
router.post('/users/login', loginUserController)

export default router

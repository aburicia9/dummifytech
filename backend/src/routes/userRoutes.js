// Importamos express y creamos un router.
import { Router } from 'express'
import { newUserController } from '../controllers/users/newUserController.js'
const router = Router()

// Creamos la ruta. (endpoint)
router.post('/users/register', newUserController)

export default router

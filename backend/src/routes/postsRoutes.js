// Importamos express y creamos un router.
import { Router } from 'express'
import { listPostsController } from '../controllers/posts/listsPostsController.js'
import { authUserController } from '../middlewares/authUserController.js'
const router = Router()

// Creamos la ruta. (endpoint)
router.get('/posts', authUserController, listPostsController)

export default router

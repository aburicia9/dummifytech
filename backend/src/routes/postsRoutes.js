// Importamos express y creamos un router.
import { Router } from 'express'
import { listPostsController } from '../controllers/posts/listsPostsController.js'
const router = Router()

// Creamos la ruta. (endpoint)
router.get('/posts', listPostsController)

export default router

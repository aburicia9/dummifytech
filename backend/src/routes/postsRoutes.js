// Importamos express y creamos un router.
import { Router } from 'express'
import { sellectAllPostsModel } from '../models/posts/sellectAllPostsModel.js'
const router = Router()

// Creamos la ruta. (endpoint)
router.get('/posts', sellectAllPostsModel)

export default router

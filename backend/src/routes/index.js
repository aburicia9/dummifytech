// Importamos express y Router para crear la ruta.
import { Router } from 'express'

// Importamos las rutas.
import userRoutes from './userRoutes.js'
import postsRoutes from './postsRoutes.js'
import categoriesRoutes from './categoriesRoutes.js'
import commentsRoutes from './commentsRoutes.js'

export const router = Router()

router.use(postsRoutes)
router.use(userRoutes)
router.use(categoriesRoutes)
router.use(commentsRoutes)

export default router

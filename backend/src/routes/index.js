import { Router } from 'express'
import userRoutes from './userRoutes.js'
export const router = Router()

router.use(userRoutes)

export default router

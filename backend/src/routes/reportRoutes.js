import { Router } from 'express'
import { authUserController } from '../middlewares/authUserController.js'
import { getAllReportController } from '../controllers/reports/getAllReportController.js'
import { roleUserController } from '../middlewares/roleUserController.js'
import { postAlreadyExistsController } from '../middlewares/postAlreadyExistsController.js'
import { newReportController } from '../controllers/reports/newReportController.js'
import { deleteReportController } from '../controllers/reports/deleteReportController.js'

const router = Router()

// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE REPORTS
// ------------------------------------------------------------------------------------------------
// #region reportes
// Visualizar los reports
router.get('/posts/reports', authUserController, roleUserController, getAllReportController)

// Dar report a una publicación
router.post('/posts/:postId/report', authUserController, postAlreadyExistsController, newReportController)

// Eliminar report a una publicación
router.delete('/posts/:postId/report', authUserController, postAlreadyExistsController, deleteReportController)
// #endregion reports

export default router

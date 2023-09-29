import { Router } from 'express'
import { deleteCategoryController } from '../controllers/categories/deleteCategoryController.js'
import { editCategoryController } from '../controllers/categories/editCategoryController.js'
import { getAllCategoriesController } from '../controllers/categories/getAllCategoriesController.js'
import { newCategoriesController } from '../controllers/categories/newCategoriesController.js'
import { authUserController } from '../middlewares/authUserController.js'
import { roleUserController } from '../middlewares/roleUserController.js'
import { newReqCategoryController } from '../controllers/categories/reqUserCategoryController.js'
import { getAllReqCategoriesController } from '../controllers/categories/getAllReqCategoriesController.js'

const router = Router()

// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE CATEGORIA
// ------------------------------------------------------------------------------------------------
// #region categoria
// Eliminar categoria
router.delete('/categories/:categoryId', authUserController, roleUserController, deleteCategoryController)

// Editar categoria
router.put('/categories/:categoryId', authUserController, roleUserController, editCategoryController)

// Peticion de categoria
router.post('/categories/request', authUserController, newReqCategoryController)

// Visualizar todas las categorias
router.get('/categories', authUserController, getAllCategoriesController)

// Visualizar todas las peticiones de categorias
router.get('/categories/request', authUserController, roleUserController, getAllReqCategoriesController)

// Crear nueva categoria
router.post('/categories/insert', authUserController, roleUserController, newCategoriesController)
// #endregion categoria

export default router

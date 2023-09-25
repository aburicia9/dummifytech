import { Router } from 'express'
import { deleteCategoryController } from '../controllers/categories/deleteCategoryController.js'
import { editCategoryController } from '../controllers/categories/editCategoryController.js'
import { getAllCategoriesController } from '../controllers/categories/getAllCategoriesController.js'
import { newCategoriesController } from '../controllers/categories/newCategoriesController.js'
import { authUserController } from '../middlewares/authUserController.js'

const router = Router()

// Eliminar categoria
router.delete('/categories/:categoryId', authUserController, deleteCategoryController)

// Editar categoria
router.put('/categories/:categoryId', authUserController, editCategoryController)

// Visualizar todas las categorias
router.get('/categories', authUserController, getAllCategoriesController)

// Crear nueva categoria
router.post('/categories/insert', authUserController, newCategoriesController)

export default router

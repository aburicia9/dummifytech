// Importamos express y creamos un router.
import { Router } from 'express'
import { listPostsController } from '../controllers/posts/listsPostsController.js'
import { authUserController } from '../middlewares/authUserController.js'
import { newPostController } from '../controllers/posts/newPostController.js'
import { postAlreadyExistsController } from '../middlewares/postAlreadyExistsController.js'
import { deletePostController } from '../controllers/posts/deletePostController.js'
import { getRandomPostController } from '../controllers/posts/getRandomPostController.js'
import { editPostController } from '../controllers/posts/editPostController.js'
import { getPostByIdCategoryController } from '../controllers/posts/getPostByIdCategoryController.js'
import { getPostByIdController } from '../controllers/posts/getPostByIdController.js'
const router = Router()

// Creamos la ruta. (endpoint)

// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE POST
// ------------------------------------------------------------------------------------------------
// #region posts
// Visualizar post sin usuario registrado
router.get('/', getRandomPostController)

// Visualizar posts con usuario registrado
router.get('/posts', authUserController, listPostsController)

// Visualizar un post por su id
router.get('/posts/:postId', authUserController, getPostByIdController)

// Vizualizar los posts con esa categoria
router.get('/posts/categories/:categoryId', authUserController, getPostByIdCategoryController)

// Creacion del post
router.post('/posts/insert', authUserController, newPostController)

// Eliminacion del post
router.delete('/posts/:postId', authUserController, postAlreadyExistsController, deletePostController)

// Editar post
router.put('/posts/:postId', authUserController, editPostController)
// #endregion post

export default router

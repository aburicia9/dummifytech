// Importamos express y creamos un router.
import { Router } from 'express'
import { listPostsController } from '../controllers/posts/listsPostsController.js'
import { authUserController } from '../middlewares/authUserController.js'
import { newPostController } from '../controllers/posts/newPostController.js'
import { postAlreadyExistsController } from '../middlewares/postAlreadyExistsController.js'
import { newLikeController } from '../controllers/posts/newLikeController.js'
import { deleteLikeController } from '../controllers/posts/deleteLikeController.js'
import { deletePostController } from '../controllers/posts/deletePostController.js'
import { selectRandomPostModel } from '../controllers/posts/getRandomPostController.js'
import { editPostController } from '../controllers/posts/editPostController.js'
const router = Router()

// Creamos la ruta. (endpoint)

// Visualizar post sin usuario registrado
router.get('/', selectRandomPostModel)

// Visualizar posts con usuario registrado
router.get('/posts', authUserController, listPostsController)

// creacion del post
router.post('/posts/insert', authUserController, newPostController)

// Eliminacion del post
router.delete('/posts/:postId', authUserController, postAlreadyExistsController, deletePostController)

// Dar like a una publicación
router.post('/posts/:postId/likes', authUserController, postAlreadyExistsController, newLikeController)

// Eliminar like de una publicación
router.delete('/posts/:postId/likes', authUserController, postAlreadyExistsController, deleteLikeController)

// Editar post
router.put('/posts/:postId', authUserController, editPostController)

export default router

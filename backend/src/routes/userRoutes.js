// Importamos express y creamos un router.
import { Router } from 'express'
import { newUserController } from '../controllers/users/newUserController.js'
import { loginUserController } from '../controllers/users/loginUserController.js'
import { getUserController } from '../controllers/users/getUserController.js'
import { authUserController } from '../middlewares/authUserController.js'
import { editUserPasswordController } from '../controllers/users/editUserPasswordController.js'
import { editAvatarController } from '../controllers/users/editAvatarController.js'
import { editUserFullNameController } from '../controllers/users/editUserFullNameController.js'
import { getAllUserController } from '../controllers/users/getAllUserController.js'
import { adminController } from '../middlewares/adminController.js'
import { deleteUserController } from '../controllers/users/deleteUserController.js'
import { getUserVerificationController } from '../controllers/users/getUserVerificationController.js'
import { editUserRoleController } from '../controllers/users/editUserRoleController.js'
import { deleteMyUserController } from '../controllers/users/deleteMyUserController.js'
import { forgottenUserPasswordController } from '../controllers/users/forgottenUserPasswordController.js'
import { listMyPostsController } from '../controllers/posts/listMyPostsController.js'

const router = Router()

// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE USUARIO
// ------------------------------------------------------------------------------------------------
// #region usuario
router.post('/register', newUserController)

// Creamos la ruta para confirmar usuario
router.get('/confirm/:token', getUserVerificationController)

// Login de usuario
router.post('/login', loginUserController)

// Recuperacion de nueva contraseña.
router.put('/recovery-password', forgottenUserPasswordController)

// Aqui empiezan las rutas de usuario existente
router.get('/users/profile', authUserController, getUserController)

// Visualizar mis publicaciones
router.get('/users/myposts', authUserController, listMyPostsController)

// Modificamos contraseña
router.put('/users/profile/password', authUserController, editUserPasswordController)

// Ruta del avatar usuario.
router.put('/users/profile/avatar', authUserController, editAvatarController)

// Ruta del fullname usuario.
router.put('/users/profile/fullname', authUserController, editUserFullNameController)

// Eliminar usuario(normal)
router.delete('/users/profile', authUserController, deleteMyUserController)
// #endregion usuario
// ------------------------------------------------------------------------------------------------
//                                        RUTAS DE ADMIN
// ------------------------------------------------------------------------------------------------
// #region admin
// Lista de usuarios
// #region swaggerGetUsers

router.get('/users', authUserController, adminController, getAllUserController)

// Editar rol
router.put('/users', authUserController, adminController, editUserRoleController)

// Eliminar usuario (admin)
router.delete('/users/:userId', authUserController, adminController, deleteUserController)
// #endregion admin
export default router

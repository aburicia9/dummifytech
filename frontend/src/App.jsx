// Importamos los componentes.
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { RecoveryPasswordPage } from './pages/RecoveryPasswordPage/RecoveryPasswordPage'
import { ToastContainer } from 'react-toastify'
import { CreatePostPage } from './pages/CreatePostPage/CreatePostPage'
import { UserProfilePage } from './pages/UserPage/UserProfilePage'
import { EditPostPage } from './pages/EditPostPage/EditPostPage'
import { ReqCategoriesPage } from './pages/ReqCategoriesPage/ReqCategoriesPage'
import { PostDetailPage } from './pages/PostDetailPage/PostDetailPage'
import { ReportsPage } from './pages/ReportsPage/ReportsPage'

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/posts/categories/:categoryId' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/recovery-password' element={<RecoveryPasswordPage />} />
        <Route path='/posts/insert' element={<CreatePostPage />} />
        <Route path='/posts/:postId' element={<PostDetailPage />} />
        <Route path='/posts/:postId/edit' element={<EditPostPage />} />
        <Route path='/posts/insert/:categoryId' element={<CreatePostPage />} />
        <Route path='/posts/:categoryId/insert' element={<CreatePostPage />} />
        <Route path='/users/profile' element={<UserProfilePage />} />
        <Route path='/users/myposts' element={<HomePage showEditDeleteButtons />} />
        <Route path='/categories/request' element={<ReqCategoriesPage />} />
        <Route path='/posts/reports' element={<ReportsPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>

  )
}

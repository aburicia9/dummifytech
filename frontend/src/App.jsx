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

export const App = () => {
  return (
    <>
      {/* <h1>DummifyTech</h1> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/posts/categories/:categoryId' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/recovery-password' element={<RecoveryPasswordPage />} />
        <Route path='/posts/insert' element={<CreatePostPage />} />
        <Route path='/users/profile' element={<UserProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>

  )
}

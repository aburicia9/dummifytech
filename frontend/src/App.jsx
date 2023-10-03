// Importamos los componentes.
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import { HomePage } from './pages/HomePage/HomePage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'

export const App = () => {
  return (
    <div className='app'>
      {/* <h1>DummifyTech</h1> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>

  )
}

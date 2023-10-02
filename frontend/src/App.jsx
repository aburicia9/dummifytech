// Importamos los componentes.
// import { Route, Routes } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import './App.css'

import { HomePage } from './pages/HomePage/HomePage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

// import { Home } from './components/Home/Home'

function App () {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>

  )
}

export default App

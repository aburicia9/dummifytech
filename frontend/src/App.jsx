// Importamos los componentes.
// import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HeaderComponent } from './components/Header/HeaderComponent'
import { NavAsideComponent } from './components/NavAside/NavAsideComponent'
import { HomePage } from './pages/Home/HomePage'
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

// import { Home } from './components/Home/Home'

function App () {
  return (
    <div>
      <HeaderComponent />
      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes> */}
      <NavAsideComponent />
      <HomePage />
    </div>
  )
}

export default App

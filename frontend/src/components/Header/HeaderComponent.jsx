import './HeaderComponent.css'
import search from '../../assets/header/search.svg'
import { useAuth } from '../../hooks/useAuth'
import { usePosts } from '../../hooks/posts/usePosts'
import { useState, useEffect } from 'react'
import { MenuCircularNoAuthComponent } from '../MenuCircular/MenuCircularNoAuthComponent'
import { MenuCircularAuthComponent } from '../MenuCircular/MenuCircularAuthComponent'
import { useLocation, useNavigate } from 'react-router-dom'

export const HeaderComponent = () => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { searchParams, setSearchParams } = usePosts()
  const queryParamsExist = location.search.length > 0

  const [keyword, setKeyword] = useState(searchParams?.get('keyword') ?? '')
  const navigate = useNavigate()

  const onSubmitFormSearch = (event) => {
    event.preventDefault()
    setSearchParams(new URLSearchParams({ keyword }))
    if (location.pathname !== '/') {
      navigate(`/?keyword=${keyword}`)
    }
  }

  const onChangeSearch = (event) => {
    setKeyword(event.target.value)
  }
  useEffect(() => {
    if (!queryParamsExist) {
      setKeyword('')
    }
  }, [location])
  const placeholderSearch = isAuthenticated ? 'Busca por titulo, contenido, categoria...' : 'Para poder buscar debes iniciar sesion'

  return (
    <>
      <header className='header'>

        <form className='form-search-header' onSubmit={onSubmitFormSearch}>
          <div className='div-form-header'>
            <input
              className='input-search-header'
              onChange={onChangeSearch}
              disabled={!isAuthenticated}
              type='text'
              placeholder={placeholderSearch}
              value={keyword}
            />
            <button
              className='button-search-header'
              disabled={!isAuthenticated}
            >
              <img
                src={search}
                alt='image search'
                className='img-search-header'
              />
            </button>
          </div>
        </form>
        {isAuthenticated
          ? (
            <div className='div-button-users-header'>
              <MenuCircularAuthComponent />
            </div>
            )
          : (
            <div className='div-button-users-header'>
              <MenuCircularNoAuthComponent />
            </div>
            )}
      </header>
    </>
  )
}

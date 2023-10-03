import logo from '../../assets/logo/logo.svg'
import './HomePage.css'

import { PostListComponent } from '../../components/PostRandom/PostListComponent'
import { usePosts } from '../../hooks/posts/usePosts'
import { CategoryListComponent } from '../../components/Category/CategoryListComponent'
import { useCategories } from '../../hooks/categories/useCategories'
import { NavLink } from 'react-router-dom'

export const HomePage = () => {
  const { posts } = usePosts()
  const { categories } = useCategories()

  return (
    <>
      <header className='layout'>
        <NavLink to='/'>
          <img className='img-div' src={logo} alt='Logo dummifytech' />
        </NavLink>
        <form className='search-div'>
          <input type='text' placeholder='Busca aqui tu post...' />
          <button>🔍</button>
        </form>
        <NavLink to='/register'>
          <button className='search1-div'>Registrarse</button>
        </NavLink>
        <button className='search2-div'>Iniciar Sesion</button>
      </header>
      <hr />
      <main className='layout2'>
        <aside>
          <h3>Categorias</h3>
          <CategoryListComponent categories={categories} />
          <footer>Copyright©</footer>
        </aside>

        <PostListComponent posts={posts} />
      </main>
    </>
  )
}

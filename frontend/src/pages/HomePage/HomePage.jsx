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
      <header>
        <NavLink to='/'>
          <img src={logo} alt='Logo dummifytech' />
        </NavLink>
        <form>
          <input type='text' placeholder='Busca aqui tu post...' />
          <button>🔍</button>
        </form>
        <NavLink to='/register'>
          <button>Registrarse</button>
        </NavLink>
        <button>Iniciar Sesion</button>
      </header>
      <main>
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

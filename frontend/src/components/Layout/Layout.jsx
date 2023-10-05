import './Layout.css'
import { HeaderComponent } from '../Header/HeaderComponent'
import { CategoryListComponent } from '../Category/CategoryListComponent'
import { useCategories } from '../../hooks/categories/useCategories'

export const Layout = ({ children, isSearchDisabled = false, isSubcategoryDisabled = false, isUserLogged = false }) => {
  const { categories } = useCategories()

  return (
    <div className='div-layout'>
      <HeaderComponent isSearchDisabled={isSearchDisabled} isUserLogged={isUserLogged} />
      <main className='main-layout'>
        <CategoryListComponent categories={categories} isSubcategoryDisabled={isSubcategoryDisabled} />
        {children}
      </main>
    </div>
  )
}

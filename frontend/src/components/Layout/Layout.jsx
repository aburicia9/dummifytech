import './Layout.css'
import { HeaderComponent } from '../Header/HeaderComponent'
import { CategoryListComponent } from '../Category/CategoryListComponent'
import { useCategories } from '../../hooks/categories/useCategories'

export const Layout = ({ children, isSearchDisabled = false, isSubcategoryDisabled = false }) => {
  const { categories } = useCategories()


  return (
    <>
      <CategoryListComponent categories={categories} isSubcategoryDisabled={isSubcategoryDisabled} />
      <main className='main-layout'>
        <HeaderComponent isSearchDisabled={isSearchDisabled} />
        {children}
      </main>
    </>
  )
}

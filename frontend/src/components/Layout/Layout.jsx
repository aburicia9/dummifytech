import './Layout.css'
import { HeaderComponent } from '../Header/HeaderComponent'
import { CategoryListComponent } from '../Category/CategoryListComponent'

export const Layout = ({ children, isSearchDisabled = false }) => {
  return (
    <>
      <CategoryListComponent />
      <main className='main-layout'>
        <HeaderComponent isSearchDisabled={isSearchDisabled} />
        {children}
      </main>
    </>
  )
}

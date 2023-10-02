import { HeaderComponent } from '../Header/HeaderComponent'
import { NavAsideComponent } from '../NavAside/NavAsideComponent'
import './LayoutComponent.css'

export const LayoutComponent = ({ children }) => {
  return (
    <>
      <HeaderComponent />
      <main className='layout-main'>
        <NavAsideComponent />
        {children}
      </main>
    </>
  )
}

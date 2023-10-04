import './HomePage.css'

import { usePosts } from '../../hooks/posts/usePosts'

import { useCategories } from '../../hooks/categories/useCategories'
import { Header } from '../../components/Header/HeaderComponent'
import { Main } from '../../components/Main/Main'

export const HomePage = () => {
  const { posts } = usePosts()
  const { categories } = useCategories()

  return (
    <div className='div-homepage'>
      <Header />
      <Main posts={posts} categories={categories} />
    </div>
  )
}

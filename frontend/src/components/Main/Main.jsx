import './Main.css'
import { CategoryListComponent } from '../Category/CategoryListComponent'
import { PostListComponent } from '../PostRandom/PostListComponent'

export const Main = ({ categories, posts }) => {
  return (
    <>
      <main className='main-homepage'>
        <CategoryListComponent categories={categories} />
        <PostListComponent posts={posts} />
      </main>
    </>
  )
}

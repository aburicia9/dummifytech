import { useEffect, useState } from 'react'
import logo from '../../assets/logo/logo.svg'
import avatarUser from '../../assets/users/defaultAvatarProfile.jpg'
import './HomePage.css'
import { listCategoriesService } from '../../services/categoryService'
import { getRandomPostService } from '../../services/postService'
import { usePosts } from '../../hooks/posts/usePosts'
const baseApiURL = import.meta.env.VITE_API_URL

export const HomePage = () => {
  const [categories, setCategories] = useState([])
  const { posts } = usePosts()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const body = await listCategoriesService()

        setCategories(body.data.categories)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      <header>
        <img src={logo} alt='Logo dummifytech' />
        <form>
          <input type='text' placeholder='Busca aqui tu post...' />
          <button>🔍</button>
        </form>
        <button>Registrarse</button>
        <button>Iniciar Sesion</button>
      </header>
      <main>
        <aside>
          <h3>Categorias</h3>
          <ul>
            {
              categories.map((category) => {
                return (
                  <li key={category.id} className='home-page-categoryParent-li'>{category.name}{
                    category.subcategories.map((subcategory) => {
                      return (
                        <li key={subcategory.id} className='home-page-subcategory-li'>{subcategory.name}</li>
                      )
                    })
                  }
                  </li>
                )
              })
            }
          </ul>
          <footer>Copyright©</footer>
        </aside>
        <article postList={posts}>
          {
              posts.map((post) => {
                return (
                  <section key={post.id}>
                    <div>
                      <img src={`${baseApiURL}/avatar/${post.avatar}`} alt='Avatar de la usuario' style={{ width: '80px', height: '80px' }} />
                      {/* <img src='http://localhost:8000/uploads/post/fbb6eb87-3cd5-47fb-a6de-0e24950d3e24.jpg' alt='Post de la imagen' /> */}
                      <p>{post.username}</p>
                      <p>{post.createdAt}</p>
                    </div>
                    <div>
                      <h5>{post.title}</h5>
                      <div>
                        {post.image
                          ? <img src={`${baseApiURL}/post/${post.image}`} alt='Post de la imagen' />
                          : <p>{post.post}</p>}
                      </div>
                      <div>
                        <button>Me gusta</button>{post.countLikes}
                        <button>No me gusta</button>
                        <button>Comentarios</button>{post.countComments}
                        <button>Reports</button>
                      </div>
                    </div>
                  </section>
                )
              })
            }
        </article>
      </main>
    </>
  )
}

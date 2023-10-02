import { useEffect, useState } from 'react'
import { getRandomPostService } from '../../services/postService'
import './HomePage.css'
import { LayoutComponent } from '../../components/Layout/LayoutComponent'

export const HomePage = () => {
  const [randomPosts, setRandomPost] = useState([])

  useEffect(() => {
    const fetchRandomPost = async () => {
      try {
        const { data } = await getRandomPostService()

        setRandomPost(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchRandomPost()
  }, [])

  return (
    <LayoutComponent>

      <section className='home-page-post-random'>
        {
          randomPosts.map((randomPost) => {
            console.log(randomPost)
            return (
              <section key={randomPost.id}>
                <p>{randomPost.username}</p>
                <p>{randomPost.createdAt}</p>
                <p>{randomPost.title}</p>
                <p>{randomPost.post}</p>
                <img src={randomPost.image} alt='' />
              </section>
            )
          })
        }
      </section>
    </LayoutComponent>
  )
}

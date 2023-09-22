// Importamos el modelo.
import { insertPostModel } from '../../models/posts/insertPostModel.js'
import { savePhoto } from '../../utils/savePhoto.js'

// Funcion controladora donde se inserta el post.
export const newPostController = async (req, res, next) => {
  try {
    const { title, post, categoryId } = req.body

    let imgName

    // Si existe alguna imagen la guardamos y obtenemos su nombre (hace falta el joi)
    if (req.files?.image) {
      imgName = await savePhoto(req.files.image, 500)
    }

    await insertPostModel(title, post, imgName, req.user.id, categoryId)

    res.send({
      status: 'ok',
      message: '¡Publicación Creada!'
      // data: {
      //   posts: {
      //     id: publicationId,
      //     userId: req.user.id,
      //     title,
      //     post,
      //     image: imgName || null,
      //     createAt: new Date()
      //   }
      // }
    })
  } catch (error) {
    next(error)
  }
}

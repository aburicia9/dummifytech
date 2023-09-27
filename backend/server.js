// Importamos las variables de entorno de nuestro fichero .env
import 'dotenv/config'

// Importamos la dependencia express para crear el servidor
import express from 'express'

// Importamos la dependencia cors para controlar las peticiones al backend
import cors from 'cors'

// Importamos la dependencia morgan para notificar por consola más detalladamente
import morgan from 'morgan'

import fileUpload from 'express-fileupload'

// Importamos controladores de errores
import { errorController, notFoundController } from './src/controllers/errors/index.js'

// Importamos las rutas.
import routes from './src/routes/index.js'
import { UPLOADS_DIR } from './src/utils/constants.js'

// Creamos la variable app para crear el servidor
const app = express()

// Middleware que indica a Express cual es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR))
app.use(express.static('./public'))

// Middleware para hacer que el back entienda el form-data (subir archivos)
app.use(fileUpload())

// Usamos app para que el servidor utilice morgan
app.use(morgan('dev'))

// Usamos app para que nuestro servidor entienda los JSON
app.use(express.json())

// Usamos app para que nuestro servidor utilice cors
app.use(cors())

// Uso
// app.get('/', (req, res) => {
//   res.send({
//     status: 'ok',
//     message: 'Welcome'
//   })
// })

// Importamos el controlador para indicar a express donde se encuentran las rutas.
app.use(routes)

// Middleware de ruta no encontrada
app.use(notFoundController)

// Middleware de error
app.use(errorController)

// Usamos app.listen para que el servidor se inicie en el puerto que viene desde nuestro .env
app.listen(process.env.PORT, () => {
  console.log(`Server iniciado en http://localhost:${process.env.PORT}`)
})

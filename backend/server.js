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

// Importamos filesystem
import fs from 'fs'

// Importamos la dependecia yaml
import yaml from 'yaml'

import swaggerUi from 'swagger-ui-express'

// Creamos la variable app para crear el servidor
const app = express()

// Importamos el puerto desde el archivo env
const PORT = process.env.PORT

// Middleware que indica a Express cual es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR))

// Middleware para hacer que el back entienda el form-data (subir archivos)
app.use(fileUpload())

// Usamos app para que el servidor utilice morgan
app.use(morgan('dev'))

// Usamos app para que nuestro servidor entienda los JSON
app.use(express.json())

// Usamos app para que nuestro servidor utilice cors
app.use(cors())

// Importamos el controlador para indicar a express donde se encuentran las rutas.
app.use(routes)

// Leemos el archivo yaml de la documentacion
const file = fs.readFileSync('./docs/swagger/apiDocs.yaml', 'utf-8')

// Convertir un archivo yaml para que lo entienda express
const docs = yaml.parse(file)

// Importamos ruta para utilizar Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(docs))

// Middleware de ruta no encontrada
app.use(notFoundController)

// Middleware de error
app.use(errorController)

// Usamos app.listen para que el servidor se inicie en el puerto que viene desde nuestro .env
app.listen(PORT, () => {
  console.log(`Server iniciado en http://localhost:${PORT}`)

  console.info(`🗒️ Documentacion disponible en http://localhost:${PORT}/docs`)
})

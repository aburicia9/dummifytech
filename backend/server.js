// Importamos las variables de entorno de nuestro fichero .env
import 'dotenv/config'

// Importamos la dependencia express para crear el servidor
import express from 'express'

// Importamos la dependencia cors para controlar las peticiones al backend
import cors from 'cors'

// Importamos la dependencia morgan para notificar por consola más detalladamente
import morgan from 'morgan'

// Creamos la variable app para crear el servidor
const app = express()

// Usamos app para que el servidor utilice morgan
app.use(morgan('dev'))

// Usamos app para que nuestro servidor entienda los JSON
app.use(express.json())

// Usamos app para que nuestro servidor utilice cors
app.use(cors())

// Ruta raíz, con el get
app.get('/', (req, res) => {
  res.send({
    status: 'ok'
  })
})
// Ruta prueba Login
app.get('/login', (req, res) => {
  res.send({
    status: 'login'
  })
})
// Ruta prueba categorias
app.get('/categorias', (req, res) => {
  res.send({
    status: 'categorias'
  })
})

// Manejador de error 404 para cualquier otra ruta no definida utilizando es USE.
// Todo lo que no esté contemplado en el app.get serà un error 404.
app.use((req, res) => {
  res.status(404).json({
    error: 'Error 404: Not Found'
  })
})

// Usamos app.listen para que el servidor se inicie en el puerto que viene desde nuestro .env
app.listen(process.env.PORT, () => {
  console.log(`Server iniciado en http://localhost:${process.env.PORT}`)
})

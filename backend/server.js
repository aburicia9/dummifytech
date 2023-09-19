// Importamos las variables de entorno de nuestro fichero .env
import 'dotenv/config'

// Importamos la dependencia express para crear el servidor
import express from 'express'

// Importamos la dependencia cors para controlar las peticiones al backend
import cors from 'cors'

// Importamos la dependencia morgan para que notificar por consola mas detallado
import morgan from 'morgan'

// Creamos la variable app para crear el servidor
const app = express()

// Usamos app para que el servidor utiliza morgan
app.use(morgan('dev'))

// Usamos app para que nuestro servidor entienda los json
app.use(express.json())

// Usamos app para que nuestro servidor utilice cors
app.use(cors())

app.use('/', (req, res) => {
  res.send({
    status: 'ok'
  })
})

// Usamos app.listen para que el servidor se inicie en el puerto que viene desde nuestro .env
app.listen(process.env.PORT, () => {
  console.log(`Server iniciado en http://localhost:${process.env.PORT}`)
})

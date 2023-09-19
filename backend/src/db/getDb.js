// Importamos mysql
import mysql from 'mysql2/promise'

// Obtenemos la informacion destructurada desde el .env
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env

// Variables que va a almacenar un grupo grande de conexiones.
let pool

// Variable que va a hacer la conexion con la base de datos.
export const getDb = async () => {
  try {
    if (!pool) {
      const connection = await mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        timezone: 'Z'
      })

      await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`)

      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: 'Z'
      })
    }

    return await pool.getConnection()
  } catch (error) {
    console.error(error)
  }
}

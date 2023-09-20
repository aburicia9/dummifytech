import bcrypt from 'bcrypt'
import { getDb } from '../../db/getDb.js'
import { emailAlreadyRegisteredError, userAlreadyRegisteredError } from '../../services/errorService.js'
// Función que se conectará a la base de datos y creará un usuario.
export const insertUserModel = async (username, email, password, fullName) => {
  let connection

  try {
    connection = await getDb()

    // Buscamos en la base de datos algún usuario con ese email.
    let [users] = await connection.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )

    // Si existe algún usuario con ese email lanzamos un error.
    if (users.length > 0) {
      emailAlreadyRegisteredError()
    }

    // Buscamos en la base de datos algún usuario con el nombre dado.
    [users] = await connection.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    )

    // Si existe algún usuario con ese nombre lanzamos un error.
    if (users.length > 0) {
      userAlreadyRegisteredError()
    }

    // Encriptamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10)

    // Creamos el usuario.
    await connection.query(
      'INSERT INTO users(username, email, password, full_name) VALUES(?, ?, ?, ?)',
      [username, email, hashedPass, fullName]
    )
  } finally {
    if (connection) connection.release()
  }
}

// Importamos dependencia bcrypt para encriptar la contraseña.
import bcrypt from 'bcrypt'

// Importamos funcion donde se crea la conexión con la base de datos.
import { getDb } from '../../db/getDb.js'

// Impotamos errores.
import { emailAlreadyRegisteredError, userAlreadyRegisteredError } from '../../services/errorService.js'

// Función que se conectará a la base de datos y creará un usuario.
export const insertUserModel = async (username, email, password, fullName, verificationCode = '', status = 0) => {
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
      'INSERT INTO users(username, email, password, full_name, verification_code,status) VALUES(?, ?, ?, ?,?,?)',
      [username, email, hashedPass, fullName, verificationCode, status]
    )
  } finally {
    if (connection) connection.release()
  }
}

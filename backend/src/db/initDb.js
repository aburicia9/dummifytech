import 'dotenv/config'
import { getDb } from './getDb.js'
console.log('fuera, funciona?')
export const main = async () => {
  let connection

  try {
    connection = await getDb()

    console.log('Borrando tablas...')

    await connection.query('DROP TABLE IF EXISTS likes')
    await connection.query('DROP TABLE IF EXISTS comments')
    await connection.query('DROP TABLE IF EXISTS posts')
    await connection.query('DROP TABLE IF EXISTS subcategories')
    await connection.query('DROP TABLE IF EXISTS categories')
    await connection.query('DROP TABLE IF EXISTS users')

    console.log('¡Tablas borradas! ✅')

    console.log('Creando tabla de USUARIOS...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role ENUM('admin', 'moderator', 'normal') default 'normal',
        avatar VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    console.log('¡Tabla de USUARIOS creada! 😉✅')
    console.log('Creando tabla de CATEGORIAS...')

    await connection.query(`
        CREATE TABLE IF NOT EXISTS categories(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(100) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP
        )
      `)
    console.log('¡Tabla de CATEGORIAS creada! 😉✅')
    console.log('Creando tabla de SUBCATEGORIAS...')

    await connection.query(`
        CREATE TABLE IF NOT EXISTS subcategories(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(100) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          id_category INT UNSIGNED NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY(id_category) REFERENCES categories(id)
        )
      `)
    console.log('¡Tabla de SUBCATEGORIAS creada! 😉✅')
    console.log('Creando tabla de POSTS...')

    await connection.query(`
        CREATE TABLE IF NOT EXISTS posts(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(100) NOT NULL,
          post VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          report BOOLEAN default 0,
          id_category INT unsigned,
          id_subcategory INT unsigned,
          id_user INT unsigned,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY(id_category) REFERENCES categories(id),
          FOREIGN KEY(id_subcategory) REFERENCES subcategories(id),
          FOREIGN KEY(id_user) REFERENCES users(id)
        )
      `)
    console.log('¡Tabla de POSTS creada! 😉✅')
    console.log('Creando tabla de COMMENTS...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        comment VARCHAR(255) NOT NULL,
        id_user INT unsigned,
        id_post INT unsigned,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_user) REFERENCES users(id),
        FOREIGN KEY(id_post) REFERENCES posts(id)
      )
    `)
    console.log('¡Tabla de COMMENTS creada! 😉✅')
    console.log('Creando tabla de LIKES...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS likes(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user INT unsigned,
        id_post INT unsigned,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_user) REFERENCES users(id),
        FOREIGN KEY(id_post) REFERENCES posts(id)
      )
    `)
    console.log('¡Tabla de LIKES creada! 😉✅')
    console.log('¡Todas las tablas han sido creadas con exito! 🎉🥳😲')
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) connection.release()

    process.exit()
  }
}

main()

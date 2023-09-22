import { getDb } from './getDb.js'

export const main = async () => {
  let connection

  try {
    connection = await getDb()

    console.log('Borrando tablas...')

    await connection.query('DROP TABLE IF EXISTS reports')
    await connection.query('DROP TABLE IF EXISTS likes')
    await connection.query('DROP TABLE IF EXISTS comments')
    await connection.query('DROP TABLE IF EXISTS posts')
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
          id_categories_parent INT UNSIGNED DEFAULT NULL,
          name VARCHAR(100) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY(id_categories_parent) REFERENCES categories(id) ON DELETE CASCADE
        )
      `)
    console.log('¡Tabla de CATEGORIAS creada! 😉✅')
    console.log('Creando tabla de POSTS...')

    await connection.query(`
        CREATE TABLE IF NOT EXISTS posts(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(100) NOT NULL,
          post VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          report BOOLEAN default 0,
          id_category INT unsigned NOT NULL,
          id_user INT unsigned NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY(id_category) REFERENCES categories(id) ON DELETE CASCADE,
          FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE
        )
      `)
    console.log('¡Tabla de POSTS creada! 😉✅')
    console.log('Creando tabla de COMMENTS...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS comments(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_comment_parent INT UNSIGNED DEFAULT NULL,
        comment VARCHAR(255) NOT NULL,
        id_user INT unsigned NOT NULL,
        id_post INT unsigned NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_comment_parent) REFERENCES comments(id) ON DELETE CASCADE,
        FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE
      )
    `)
    console.log('¡Tabla de COMMENTS creada! 😉✅')
    console.log('Creando tabla de LIKES...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS likes(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user INT unsigned NOT NULL,
        id_post INT unsigned NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE
      )
    `)
    console.log('¡Tabla de LIKES creada! 😉✅')
    console.log('Creando tabla de REPORTES...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS reports(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user INT unsigned NOT NULL,
        id_post INT unsigned NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE
      )
    `)
    console.log('¡Tabla de REPORTES creada! 😉✅')

    console.log('¡Todas las tablas han sido creadas con exito! 🎉🥳😲')
    console.log('Creando usuario en USUARIOS...')

    await connection.query(`
      INSERT INTO users
      (full_name, email, username, password)
      VALUES('prueba', 'prueba@prueba.com', 'prueba', '$2b$10$hnxCfAN7Ju5hhLMztg118e52tYZsaos9iSQr1Vhv41QwKe2fZE4xe');
    `)
    console.log('¡Usuario creado! 😉✅')

    console.log('Creando categoria en CATEGORIAS...')

    await connection.query(`
    INSERT INTO dummifytech.categories ( name, description)
    VALUES('Moviles', 'Android');
    `)
    console.log('¡Categoria creada! 😉✅')

    console.log('Creando categoria en CATEGORIAS...')

    await connection.query(`
    INSERT INTO categories(id_categories_parent, name, description)
    VALUES(1, 'Android', 'Sistema operativo' );
    `)
    console.log('¡Categoria creada! 😉✅')

    console.log('Creando post en POST...')

    await connection.query(`
    INSERT INTO posts (title, post, id_category, id_user)
    VALUES('Samsung S20', 'Mejor movil',2,1);
    `)
    console.log('Post creada! 😉✅')

    console.log('Creando comentario en COMENTARIO...')

    await connection.query(`
    INSERT INTO dummifytech.comments(comment, id_user, id_post)
    VALUES('Esto es un comentairo sobre samsung s20', 1, 1);
    `)
    console.log('Comentario creada! 😉✅')

    console.log('Creando like en LIKES...')

    await connection.query(`
    INSERT INTO likes(id_user, id_post)
    VALUES(1, 1);
    `)
    console.log('Like creada! 😉✅')

    console.log('Creando reporte en REPORTE...')

    await connection.query(`
    INSERT INTO reports(id_user, id_post)
    VALUES(1, 1);
    `)
    console.log('Report creada! 😉✅')
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) connection.release()

    process.exit()
  }
}

main()

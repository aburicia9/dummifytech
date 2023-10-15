import { getDb } from './getDb.js'

export const main = async () => {
  let connection

  try {
    connection = await getDb()

    console.log('Borrando tablas...')

    await connection.query('DROP TABLE IF EXISTS req_categories')
    await connection.query('DROP TABLE IF EXISTS reports')
    await connection.query('DROP TABLE IF EXISTS likes')
    await connection.query('DROP TABLE IF EXISTS dislikes')
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
        role ENUM('admin', 'moderator', 'normal') DEFAULT 'normal',
        avatar VARCHAR(255) DEFAULT 'defaultAvatarProfile.jpg',
        verification_code VARCHAR(255) NOT NULL,
        status BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    console.log('¡Tabla de USUARIOS creada! 😉✅')
    console.log('Creando tabla de CATEGORIAS...')

    await connection.query(`
        CREATE TABLE IF NOT EXISTS categories(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          id_category_parent INT UNSIGNED DEFAULT NULL,
          name VARCHAR(100) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY(id_category_parent) REFERENCES categories(id) ON DELETE CASCADE
        )
      `)
    console.log('¡Tabla de CATEGORIAS creada! 😉✅')
    console.log('Creando tabla de POSTS...')

    await connection.query(`
        CREATE TABLE IF NOT EXISTS posts(
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(100) NOT NULL,
          post TEXT NOT NULL,
          image VARCHAR(255),
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
        comment TEXT NOT NULL,
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

    console.log('Creando tabla de DISLIKES...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS dislikes(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user INT unsigned NOT NULL,
        id_post INT unsigned NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE
      )
    `)
    console.log('¡Tabla de DISLIKES creada! 😉✅')

    console.log('Creando tabla de REPORTES...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS reports(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user INT unsigned NOT NULL,
        id_post INT unsigned NOT NULL,
        id_comment INT unsigned,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_comment) REFERENCES comments(id) ON DELETE CASCADE,
        FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(id_post) REFERENCES posts(id) ON DELETE CASCADE
      )
    `)
    console.log('¡Tabla de REPORTES creada! 😉✅')
    console.log('Creando tabla de PETICIONES DE CATEGORIAS...')

    await connection.query(`
      CREATE TABLE IF NOT EXISTS req_categories(
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        id_user INT unsigned NOT NULL,
        id_category_parent INT unsigned NOT NULL,
        name_category VARCHAR(100) UNIQUE NOT NULL,
        reason VARCHAR(255) NOT NULL,
        req_status BOOLEAN DEFAULT FALSE,
        accepted BOOLEAN DEFAULT FALSE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        modified_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
    console.log('¡Tabla de PETICIONES DE CATEGORIAS creada! 😉✅')

    console.log('¡Todas las tablas han sido creadas con exito! 🎉🥳😲')
    console.log('Creando usuario en USUARIOS...')

    await connection.query(`
      INSERT INTO users
      (full_name, email, username, password, verification_code, status)
      VALUES('prueba', 'prueba@prueba.com', 'prueba', '$2b$10$hnxCfAN7Ju5hhLMztg118e52tYZsaos9iSQr1Vhv41QwKe2fZE4xe', "1","1");
    `)
    console.log('¡Usuario creado! 😉✅')
    console.log('Creando usuario en USUARIOS...')

    await connection.query(`
      INSERT INTO users
      (full_name, email, username, password, verification_code,role,status)
      VALUES('admin', 'admin@admin.com', 'admin', '$2b$10$hnxCfAN7Ju5hhLMztg118e52tYZsaos9iSQr1Vhv41QwKe2fZE4xe', "1", "admin","1");
    `)
    console.log('¡Usuario creado! 😉✅')
    console.log('Creando usuario en USUARIOS...')

    await connection.query(`
      INSERT INTO users
      (full_name, email, username, password, verification_code,role,status)
      VALUES('moderator', 'moderator@moderator.com', 'moderator', '$2b$10$hnxCfAN7Ju5hhLMztg118e52tYZsaos9iSQr1Vhv41QwKe2fZE4xe', "1","moderator","1");
    `)
    console.log('¡Usuario creado! 😉✅')

    console.log('Creando categoria en la tabla CATEGORIAS...')

    await connection.query(`
    INSERT INTO categories ( name, description)
    VALUES('Ordenadores', 'Hardware, software, consejos y tendencias para entusiastas tecnológicos');
    `)
    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(1, 'Hardware', 'Explora el mundo físico de la tecnología: componentes, dispositivos y equipos.' );
    `)

    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(1, 'Software', 'Discute sobre programas, aplicaciones y sistemas informáticos en constante evolución.' );
    `)

    await connection.query(`
    INSERT INTO categories ( name, description)
    VALUES('IA', 'Innovaciones en la simulación de inteligencia humana a través de tecnología');
    `)

    await connection.query(`
    INSERT INTO categories ( name, description)
    VALUES('Videojuegos', 'Explora mundos virtuales, compite y disfruta de experiencias interactivas en línea.');
    `)
    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(5, 'PlayStation', 'Comunidad dedicada a la consola de videojuegos PlayStation, juegos y noticias.' );
    `)

    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(5, 'Xbox', 'Espacio de discusión sobre la plataforma de juegos Xbox, títulos y novedades.' );
    `)

    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(5, 'Nintendo', 'Comunidad apasionada por los juegos de Nintendo, consolas y personajes icónicos.' );
    `)

    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(5, 'Pc', 'Discusión y noticias sobre juegos de PC, mods, recomendaciones y análisis.' );
    `)

    await connection.query(`
    INSERT INTO categories ( name, description)
    VALUES('Desarrollo', 'Conversa sobre programación, diseño y creación de aplicaciones y software.');
    `)
    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(10, 'Python', 'Es conocido por su legibilidad y versatilidad, utilizado en una amplia gama de aplicaciones, desde desarrollo web hasta inteligencia artificial y análisis de datos.
    .' );
    `)
    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(10, 'JavaScript', 'Es ampliamente utilizado para el desarrollo web y es esencial en la construcción de aplicaciones web interactivas' );
    `)

    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(10, 'Java', 'Es comúnmente utilizado en desarrollo de aplicaciones empresariales, aplicaciones móviles (Android), y sistemas embebidos.' );
    `)

    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(10, 'C# (C Sharp)', ' Es un lenguaje de programación desarrollado por Microsoft y es muy utilizado en el desarrollo de aplicaciones de Windows, incluyendo aplicaciones de escritorio y juegos.' );
    `)

    await connection.query(`
    INSERT INTO categories ( name, description)
    VALUES('Móviles', 'Habla sobre smartphones, aplicaciones, consejos y novedades móviles.');
    `)
    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(15, 'Android', 'Sistema operativo móvil de Google para dispositivos y aplicaciones.' );
    `)

    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(15, 'IOS', 'Sistema operativo móvil exclusivo de Apple para iPhone, iPad y iPod Touch, conocido por su seguridad, rendimiento y ecosistema de aplicaciones.' );
    `)

    await connection.query(`
    INSERT INTO categories ( name, description)
    VALUES('DummyMemes', 'Disfruta de un rincón divertido para compartir y crear memes.');
    `)
    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(4, 'IA ', 'Innovaciones en la simulación de inteligencia humana a través de tecnología');
    `)
    await connection.query(`
    INSERT INTO categories(id_category_parent, name, description)
    VALUES(18, 'DummyMemes ', 'Disfruta de un rincón divertido para compartir y crear memes.');
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
    INSERT INTO comments(comment, id_user, id_post)
    VALUES('Esto es un comentairo sobre samsung s20', 1, 1);
    `)
    console.log('Comentario creada! 😉✅')

    console.log('Creando like en LIKES...')

    await connection.query(`
    INSERT INTO likes(id_user, id_post)
    VALUES(1, 1);
    `)
    console.log('Like creado! 😉✅')

    console.log('Creando dislike en DIsLIKES...')

    await connection.query(`
    INSERT INTO dislikes(id_user, id_post)
    VALUES(1, 1);
    `)
    console.log('Dislike creado! 😉✅')

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

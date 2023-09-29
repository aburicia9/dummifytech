# DummifyTech

Aqui presentamos nuestro proyecto de un foro de opiniones donde los usuarios podrán compartir sus opiniones acerca de distintos temas navegando por las distintas categorías.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.
4. Ejecutar `npm start` para lanzar el servidor.

## Entidades

### Users

| Campo                | Tipo     | Descripción                           |
| -------------------- | -------- | ------------------------------------- |
| id                   | INT      | Identificador único del usuario.      |
| full_name            | VARCHAR  | Nombre completo del usuario           |
| email                | VARCHAR  | Dirección de correo electrónico.      |
| username             | VARCHAR  | Nombre de usuario.                    |
| password             | VARCHAR  | Contraseña del usuario.               |
| role                 | ENUM     | Rol del usuario (anónimo,mod,admin)   |
| avatar               | VARCHAR  | Nombre del avatar del usuario.        |
| role                 | VARCHAR  | Rol del usuario (normal o admin).     |
|verification_code     | VARCHAR  | Codigo de verificación email          |
| status               | BOOLEAN  | Estado del usuario                    |
| createdAt            | DATETIME | Fecha y hora de creación del usuario. |
| modifiedAt           | DATETIME | Fecha y hora de última modificación.  |

### Categories

| Campo      | Tipo     | Descripción                                  |
| ----------------------- | -------- | -------------------------------------------- |
| id                      | INT      | Identificador único de la categoria          |
| id_categories_parent    | INT      | Identificador la categoría padre.            |
| name                    | VARCHAR  | Nombre de la categoria                       |
| description             | VARCHAR  | Descripción de la categoría.                 |
| image                   | VARCHAR  | Imagen asociada a la categoria               |
| createdAt               | DATETIME | Fecha y hora de creación de la categoria     |
| modifiedAt              | DATETIME | Fecha y hora de última modificación.         |

### Posts

| Campo       | Tipo     | Descripción                                  |
| ----------- | -------- | -------------------------------------------- |
| id          | INT      | Identificador único del post                 |
| title       | VARCHAR  | Titulo del post.                             |
| post        | TEXT     | Contenido del post.                          |
| image       | VARCHAR  | Imagen del post                              |
| id_category | INT      | Identidicador categoría a la que sube el post|
| id_user     | INT      | Identificador del usuario que sube el post   |
| createdAt   | DATETIME | Fecha y hora de creación del post            |
| modifiedAt  | DATETIME | Fecha y hora de última modificación.         |

### Comments

| Campo              | Tipo     | Descripción                                      |
| ------------------ | -------- | ------------------------------------------------ |
| id                 | INT      | Identificador único del comentario.              |
| id_comment_parent  | INT      | Identificador del comentario padre.              |
| comment            | TEXT     | Texto del comentario                             |
| id_user            | INT      | Identidicador unico del usuario                  |
| id_post            | INT      | Identificador unico del post al que comentas     |
| createdAt          | DATETIME | Fecha y hora de creación del comentario          |
| modifiedAt         | DATETIME | Fecha y hora de última modificación.             |

### Likes

| Campo     | Tipo     | Descripción                                  |
| --------- | -------- | -------------------------------------------- |
| id        | INT      | Identificador único del like.                |
| id_user   | INT      | Identificador del usuario que dio el like.   |
| id_post   | INT      | Identificador del post que recibió el like.  |
| createdAt | DATETIME | Fecha y hora de creación del like.           |
| modifiedAt| DATETIME | Fecha y hora de última modificación.         |

### Dislikes

| Campo     | Tipo     | Descripción                                     |
| --------- | -------- | --------------------------------------------    |
| id        | INT      | Identificador único del dislike.                |
| id_user   | INT      | Identificador del usuario que dio el dislike.   |
| id_post   | INT      | Identificador del post que recibió el dislike.  |
| createdAt | DATETIME | Fecha y hora de creación del dislike.           |
| modifiedAt| DATETIME | Fecha y hora de última modificación.            |

### Reports

| Campo     | Tipo     | Descripción                                         |
| --------- | -------- | --------------------------------------------------- |
| id        | INT      | Identificador único del report.                     |
| id_user   | INT      | Identificador del usuario que dio el report.        |
| id_post   | INT      | Identificador del post que recibió el report.       |
| id_comment| INT      | Identificador del comentario que recibió el report. |
| createdAt | DATETIME | Fecha y hora de creación del report.                |
| modifiedAt| DATETIME | Fecha y hora de última modificación.                |



# Endpoints

## Usuario no registrado.

-   GET `/` - Visualizar post sin usuario registrado, solo un post aleatorio
-   POST `/register` - Registro de usuario.
-   GET `/confirm/:token` - Confirmación del usuario

##  Usuario registrado rol normal.

-   POST `/login` - Login de usuario (devuelve token).
  #### Perfil
-   GET `/users/profile` - Perfil de usuario
-   PUT `/users/profile/avatar` - Editar el avatar.
-   PUT `/users/profile/password` - Editar la contraseña.
-   PUT `/users/profile/fullname` - Editar el nombre completo.
-   DELETE `users/profile` - Borrar tu usuario
  #### Posts
-   GET `/posts` - Visualizar posts con usuario registrado
-   GET `/posts/myposts` - Visualizar mis posts.
-   POST `/posts/insert` - Insertar un post
-   DELETE `/posts/:postId` - Borrar un propio post o borrar si  eres administrador o moderador.
-   PUT `/posts/:postId` - Editar un propio post.
  #### Categorias
-   GET `/categories` - Visualizar categorias
  #### Reports
-   POST `/posts/:postId/report` Reportar un post.
-   DELETE `/posts/:postId/report` Borrar nuestro propio report.
  #### Comentarios
-   GET `/posts/:postId/comments` - Visualizar comentarios de un post.
-   POST `/posts/:postId/comments` -Crear comentario
-   POST `/posts/:postId/comments/:commentId`-Crear respuesta a un comentario.
-   DELETE `/posts/:postId/comments/:commentId` - Borrar un comentario propio.
-   PUT `/posts/:postId/comments/:commentId` - Editar un comentario propio.
  #### Likes
-   POST `/posts/:postId/likes` - Dar like a un post
-   DELETE `/posts/:postId/likes` - Quitar un like propio a un post
  #### Dislikes
-   POST `/posts/:postId/dislikes` - Dar dislike a un post
-   DELETE `/posts/:postId/dislikes` - Quitar un dislike propio a un post


## Usuario registrado rol moderador.

     Las mismas que el rol normal, y añadimos:
-   PUT `/categories/:categoryId` -Editar la categoría.
-   POST `/categories/insert` - Añadir nueva categoría.
-   DELETE `/categories/:categoryId` - Borrar categoría.
-   GET `/reports` - Visualizar los reports a un post o comentario.

## Usuario registrado rol admin

    Las mismas que el rol normal y moderador y añadimos:

-   GET `/users` - Lista de usuarios
-   DELETE `/users/:userId` - Borrar usuario
-   PUT `/users/:userId` - Editar role de usuario


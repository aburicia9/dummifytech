

![logo dummifytech](./backend/documents/Logo.png)

#### [ENGLISH README](#dummifytech-en)

# DummifyTech ES

Aqui presentamos nuestro proyecto de un foro de opiniones donde los usuarios podrán compartir sus opiniones acerca de distintos temas navegando por las distintas categorías.

## Instalar

### Frontend
1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Ejecutar `npm run dev` para lanzar el servidor.
3. Para la realización del frontend del proyecto se ha utilizado JavaScript, React con Vite y CSS vanilla.


### Backend
1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb:faker` para crear las tablas necesarias en la base de datos anteriormente creada y para extraer los datos introducidos por faker.
4. Ejecutar `npm start` para lanzar el servidor.
5. Para la realización del backend se ha utilizado Node con Express y para la validación de los esquemas se ha utilizado la libreria zod.

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

-   GET `/` - Visualizar post sin usuario registrado, solo un post aleatorio.
-   POST `/register` - Registro de usuario.
-   GET `/users/verify` - Confirmación del usuario.
-   POST `/login` - Login de usuario (devuelve token).
-   PUT `/recovery-password` - Recuperar contraseña
##  Usuario registrado rol normal.
  #### Usuarios
-   GET `/users/profile` - Perfil de usuario.
-   PUT `/users/profile/avatar` - Editar el avatar.
-   PUT `/users/profile/password` - Editar la contraseña.
-   PUT `/users/profile/fullname` - Editar el nombre completo.
-   DELETE `users/profile` - Borrar tu usuario.
-   GET `/users/myposts` - Visualizar mis posts.
  #### Posts
-   GET `/posts` - Visualizar posts con usuario registrado.
-   GET `/posts/:postId` - Visualizar posts con usuario registrado.
-   GET `/posts/categories/:categoryId` Visualizar un post por su id de categoria
-   POST `/posts/insert` - Insertar un post.
-   DELETE `/posts/:postId` - Borrar un propio post o borrar si  eres administrador o moderador.
-   PUT `/posts/:postId` - Editar un propio post.
  #### Categorias
-   GET `/categories` - Visualizar categorias.
-   GET `/categories/:categoryId` - Visualizar categorias por ID categoría
-   POST `/categories/request` - Solicitar nueva categoría
  #### Reportes
-   POST `/posts/:postId/report` Reportar un post.
-   DELETE `/posts/:postId/report` Borrar nuestro propio report.
  #### Comentarios
-   GET `/posts/:postId/comments` - Visualizar comentarios de un post.
-   POST `/posts/:postId/comments` -Crear comentario.
-   POST `/posts/:postId/comments/:commentId`-Crear respuesta a un comentario. (Futurible)
-   DELETE `/posts/:postId/comments/:commentId` - Borrar un comentario propio.
-   PUT `/posts/:postId/comments/:commentId` - Editar comentario propio (Futurible)

  #### Likes/Dislikes
-   POST `/posts/:postId/likes` - Dar like a un post.
-   DELETE `/posts/:postId/likes` - Quitar un like propio a un post.
-   POST `/posts/:postId/dislikes` - Dar dislike a un post.
-   DELETE `/posts/:postId/dislikes` - Quitar un dislike propio a un post.


## Usuario registrado rol moderador.

     Las mismas que el rol normal, y añadimos:
   #### Categorias
-   PUT `/categories/:categoryId` -Editar la categoría. (Futurible)
-   POST `/categories/insert` - Añadir nueva categoría.
-   DELETE `/categories/:categoryId` - Borrar categoría. (Futurible)
-   GET `/categories/request` - Visualizar las peticiones de categorías
-   PUT `/categories/request`- Editar las peticiones de categorias.


#### Reportes
-   GET `/posts/reports` - Visualizar los reports a un post.
-   DELETE `/posts/:postId/allreport` - Eliminar los reportes de un post

## Usuario registrado rol admin

    Las mismas que el rol normal y moderador y añadimos:

-   GET `/users` - Lista de usuarios.
-   DELETE `/users/:userId` - Borrar usuario.
-   PUT `/users` - Editar rol de usuario.

### Documentación

    Para visualizar la documentacion de todos los endpoints, visita http://localhost:8000/docs

## Equipo

Este proyecto fue creado por:



<a href = "https://github.com/aburicia9/dummifytech/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=aburicia9/dummifytech"/>
</a>


## Tecnologías empleadas

![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![MySql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Git](	https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)





---


####
 [README EN ESPAÑOL](#dummifytech-es)

# DummifyTech EN

![logo dummifytech](./backend/documents/Logo.png)



Here we present our project of a forum for opinions where users can share their opinions on various topics by navigating through different categories.

## Installation

### Frontend

1. Install the dependencies using the command npm install or npm i.
2. Run npm run dev to launch the server.
3. JavaScript, React with Vite, and vanilla CSS have been used for the frontend development of the project.

## Backend
1. Install the dependencies using the command npm install or npm i.
2. Save the .env.example file as .env and fill in the necessary data.
3. Run npm run initDb:faker to create the required tables in the previously created database and populate them with data generated by faker.
4. Run npm start to start the server.
5. Node with Express has been used for the backend development, and the zod library has been used for schema validation.
## Entities

### Users

| Field                | Type     | Description                               |
| -------------------- | -------- | ----------------------------------------- |
| id                   | INT      | Unique identifier of the user.            |
| full_name            | VARCHAR  | User's full name.                         |
| email                | VARCHAR  | Email address.                            |
| username             | VARCHAR  | User's username.                          |
| password             | VARCHAR  | User's password.                          |
| role                 | ENUM     | User's role (anonymous, mod, admin).      |
| avatar               | VARCHAR  | User's avatar name.                       |
| role                 | VARCHAR  | User's role (normal or admin).            |
| verification_code    | VARCHAR  | Email verification code.                  |
| status               | BOOLEAN  | User's status.                            |
| createdAt            | DATETIME | Date and time of user creation.           |
| modifiedAt           | DATETIME | Date and time of last modification.       |

### Categories

| Field                 | Type     | Description                                  |
| --------------------- | -------- | -------------------------------------------- |
| id                    | INT      | Unique identifier of the category.            |
| id_categories_parent  | INT      | Identifier of the parent category.             |
| name                  | VARCHAR  | Category name.                                 |
| description           | VARCHAR  | Category description.                          |
| image                 | VARCHAR  | Image associated with the category.            |
| createdAt             | DATETIME | Date and time of category creation.           |
| modifiedAt            | DATETIME | Date and time of last modification.           |

### Posts

| Field        | Type     | Description                                  |
| ------------ | -------- | -------------------------------------------- |
| id           | INT      | Unique identifier of the post.                |
| title        | VARCHAR  | Post title.                                   |
| post         | TEXT     | Post content.                                 |
| image        | VARCHAR  | Post image.                                   |
| id_category  | INT      | Identifier of the category to which the post belongs. |
| id_user      | INT      | Identifier of the user who posted the post.   |
| createdAt    | DATETIME | Date and time of post creation.               |
| modifiedAt   | DATETIME | Date and time of last modification.           |

### Comments

| Field              | Type     | Description                                      |
| ------------------ | -------- | ------------------------------------------------ |
| id                 | INT      | Unique identifier of the comment.                |
| id_comment_parent  | INT      | Identifier of the parent comment.                |
| comment            | TEXT     | Comment text.                                    |
| id_user            | INT      | Unique user identifier.                          |
| id_post            | INT      | Unique identifier of the post being commented on. |
| createdAt          | DATETIME | Date and time of comment creation.              |
| modifiedAt         | DATETIME | Date and time of last modification.             |

### Likes

| Field     | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| id        | INT      | Unique identifier of the like.                |
| id_user   | INT      | Identifier of the user who gave the like.     |
| id_post   | INT      | Identifier of the post that received the like. |
| createdAt | DATETIME | Date and time of like creation.               |
| modifiedAt| DATETIME | Date and time of last modification.          |

### Dislikes

| Field     | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| id        | INT      | Unique identifier of the dislike.                |
| id_user   | INT      | Identifier of the user who gave the dislike.     |
| id_post   | INT      | Identifier of the post that received the dislike. |
| createdAt | DATETIME | Date and time of dislike creation.               |
| modifiedAt| DATETIME | Date and time of last modification.              |

### Reports

| Field     | Type     | Description                                         |
| --------- | -------- | --------------------------------------------------- |
| id        | INT      | Unique identifier of the report.                     |
| id_user   | INT      | Identifier of the user who reported.                 |
| id_post   | INT      | Identifier of the post that was reported.            |
| id_comment| INT      | Identifier of the comment that was reported.         |
| createdAt | DATETIME | Date and time of report creation.                    |
| modifiedAt| DATETIME | Date and time of last modification.                 |

# Endpoints

## Unregistered Users

-   GET `/` - View posts without a registered user, only a random post.
-   POST `/register` - User registration.
-   GET `/users/verify` - User confirmation.
-   POST `/login` - User login (returns a token).
-   PUT `/recovery-password` - Recover password.

## Registered Users with Normal Role

#### Users

-   GET `/users/profile` - User profile.
-   PUT `/users/profile/avatar` - Edit avatar.
-   PUT `/users/profile/password` - Edit password.
-   PUT `/users/profile/fullname` - Edit full name.
-   DELETE `/users/profile` - Delete your user.
-   GET `/users/myposts` - View my posts.

#### Posts
- GET `/posts` - View posts with a registered user.
- GET `/posts/:postId` - Visualize posts with a registered user.
- GET `/posts/categories/:categoryId ` - View posts with that category.
- POST `/posts/insert` - Insert a post.
- DELETE `/posts/:postId` - Delete own post or delete if you are an administrator or moderator.
- PUT `/posts/:postId` - Edit own post.

#### Categories

- GET `/categories` - View categories.
- GET `/categories/:categoryId` - View categories by category ID.
- POST `/categories/request` - Request a new category.
#### Reports

- POST `/posts/:postId/report` - Report a post.
- DELETE `/posts/:postId/report` - Delete your own report.
#### Comments

- GET `/posts/:postId/comments` - View comments on a post.
- POST `/posts/:postId/comments` - Create a comment.
- POST `/posts/:postId/comments/:commentId` - Create a reply to a comment. (Future)
- DELETE `/posts/:postId/comments/:commentId` - Delete own comment.
- PUT `/posts/:postId/comments/:commentId` - Edit own comment. (Future)

#### Likes/Dislikes

- POST `/posts/:postId/likes` - Like a post.
- DELETE `/posts/:postId/likes` - Remove own like from a post.
- POST `/posts/:postId/dislikes` - Dislike a post.
- DELETE `/posts/:postId/dislikes` - Remove own dislike from a post.

## Registered user (Moderator Role).

      Same as the normal role, with the following additions:
   #### Categories
-   PUT `/categories/:categoryId` -Edit the category. (Future)
-   POST `/categories/insert` - Add a new category.
-   DELETE `/categories/:categoryId` -  Delete a category. (Future)
-   GET `/categories/request` - View category requests.
-   PUT `/categories/request`- Edit requests's categories.

#### Reportes
-   GET `/posts/reports` - View reports for a post.
-   DELETE `/posts/:postId/allreport` - Delete all reports for a post.

## Registered User (Admin Role)

     Same as the normal and moderator roles, with the following additions:

-   GET `/users` -  List of users.
-   DELETE `/users/:userId` -Delete a user.
-   PUT `/users` -  Edit user role.


### Documentationn

   To view the documentation for all endpoints, visit http://localhost:8000/docs

## Team

This project was created by:



<a href = "https://github.com/aburicia9/dummifytech/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=aburicia9/dummifytech"/>
</a>

## Used technologies

![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![MySql](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Git](	https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)


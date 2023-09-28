import { faker } from '@faker-js/faker/locale/es'
import { insertUserModel } from '../../models/users/insertUserModel.js'
import { insertPostModel } from '../../models/posts/insertPostModel.js'
import { insertCommentsModel } from '../../models/comments/insertCommentsModel.js'
import { getDb } from '../../db/getDb.js'
import { insertLikesModel } from '../../models/likes/insertLikesModel.js'
import { insertDislikeModel } from '../../models/likes/insertDislikeModel.js'
import { insertReportModel } from '../../models/reports/insertReportModel.js'

console.log('CREANDO USUARIOS')

async function generateUsers () {
  for (let id = 4; id < 11; id++) {
    const randomFirstName = faker.person.firstName()
    const randomeLastName = faker.person.lastName()
    const randomFullName = `${randomFirstName} ${randomeLastName}`
    const randomEmail = faker.internet.email({ randomFirstName, randomeLastName })
    const randomUsername = faker.internet.userName({ randomFirstName })
    const randomUsernameSlice = randomUsername.slice(0, 30)
    const randomPassword = 'pruebas'
    const randomVerificationCode = faker.string.alphanumeric({ length: { min: 100, max: 255 } })
    const status = 1
    await insertUserModel(randomUsernameSlice, randomEmail, randomPassword, randomFullName, randomVerificationCode, status)
  }
}

console.log('CREANDO POSTS')

async function generatePosts () {
  for (let id = 2; id < 11; id++) {
    const randomTitle = faker.lorem.words({ min: 3, max: 7 })
    const randomPost = faker.lorem.text()
    const randomImage = faker.image.url()
    const randomCategoryId = faker.number.int({ min: 7, max: 17 })
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    await insertPostModel(randomTitle, randomPost, randomImage, randomUserId, randomCategoryId)
  }
}

console.log('CREANDO COMENTARIOS')

async function generateComments () {
  for (let id = 2; id < 51; id++) {
    const commentId = null
    const randomComment = faker.lorem.text()
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    const randomPostId = faker.number.int({ min: 1, max: 10 })
    await insertCommentsModel(commentId, randomComment, randomUserId, randomPostId)
  }
}

console.log('CREANDO RESPUESTA AL COMENTARIO')

async function generateCommentsToComments () {
  async function selectPostToComment () {
    let connection
    try {
      connection = await getDb()
      const [idPostsComments] = await connection.query(`
        SELECT c.id as idComment, c.id_post as idPost
        FROM comments c
      `)
      return idPostsComments
    } finally {
      if (connection) connection.release()
    }
  }
  const postsCommentsId = await selectPostToComment()

  const promises = postsCommentsId.map((postCommentId) => {
    const randomParentId = postCommentId.idComment
    const randomPostId = postCommentId.idPost
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    const randomComment = faker.lorem.text()
    return insertCommentsModel(randomParentId, randomComment, randomUserId, randomPostId)
  })
  await Promise.all(promises)
}

console.log('CREANDO LIKES')

async function generateLikesPost () {
  for (let id = 2; id < 51; id++) {
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    const randomPostId = faker.number.int({ min: 2, max: 10 })
    try {
      await insertLikesModel(randomPostId, randomUserId)
    } catch (error) {

    }
  }
}

console.log('CREANDO DISLIKE')

async function generateDislikesPost () {
  for (let id = 2; id < 51; id++) {
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    const randomPostId = faker.number.int({ min: 2, max: 10 })
    try {
      await insertDislikeModel(randomPostId, randomUserId)
    } catch (error) {

    }
  }
}

console.log('CREANDO REPORTES AL POST')

async function generateReportPost () {
  for (let id = 2; id < 51; id++) {
    const randomCommentId = null
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    const randomPostId = faker.number.int({ min: 2, max: 10 })
    try {
      await insertReportModel(randomPostId, randomUserId, randomCommentId)
    } catch (error) {

    }
  }
}

console.log('CREANDO REPORTES AL COMENTARIO')

async function generateReportComment () {
  for (let id = 2; id < 51; id++) {
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    const randomPostId = faker.number.int({ min: 2, max: 10 })
    const randomCommentId = faker.number.int({ min: 2, max: 10 })
    try {
      await insertReportModel(randomPostId, randomUserId, randomCommentId)
    } catch (error) {

    }
  }
}

const generateData = async () => {
  try {
    await generateUsers()
    await generatePosts()
    await generateComments()
    await generateCommentsToComments()
    await generateLikesPost()
    await generateDislikesPost()
    await generateReportPost()
    await generateReportComment()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

generateData()

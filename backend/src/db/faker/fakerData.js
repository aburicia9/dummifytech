import { faker } from '@faker-js/faker/locale/es'
import { insertUserModel } from '../../models/users/insertUserModel.js'
import { insertPostModel } from '../../models/posts/insertPostModel.js'
import { insertCommentsModel } from '../../models/comments/insertCommentsModel.js'
import { getDb } from '../../db/getDb.js'
import { insertLikesModel } from '../../models/likes/insertLikesModel.js'
import { insertDislikeModel } from '../../models/likes/insertDislikeModel.js'
import { insertReportModel } from '../../models/reports/insertReportModel.js'

async function generateUsers () {
  for (let id = 2; id < 11; id++) {
    const randomFirstName = faker.person.firstName()
    const randomeLastName = faker.person.lastName()
    const randomFullName = `${randomFirstName} ${randomeLastName}`
    const randomEmail = faker.internet.email({ randomFirstName, randomeLastName })
    let randomUsername = faker.internet.userName({ randomFirstName })
    if (randomUsername > 30) {
      randomUsername = randomUsername.slice(0, 30)
    }
    const randomPassword = 'pruebas'
    await insertUserModel(randomUsername, randomEmail, randomPassword, randomFullName)
  }
}

async function generatePosts () {
  for (let id = 2; id < 11; id++) {
    const randomTitle = faker.lorem.words({ min: 3, max: 7 })
    const randomPost = faker.lorem.text()
    const randomImage = faker.image.url()
    const randomCategoryId = faker.number.int({ min: 7, max: 18 })
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    await insertPostModel(randomTitle, randomPost, randomImage, randomCategoryId, randomUserId)
  }
}

async function generateComments () {
  for (let id = 2; id < 51; id++) {
    const commentId = null
    const randomComment = faker.lorem.text()
    const randomUserId = faker.number.int({ min: 1, max: 10 })
    const randomPostId = faker.number.int({ min: 1, max: 10 })
    await insertCommentsModel(commentId, randomComment, randomUserId, randomPostId)
  }
}

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

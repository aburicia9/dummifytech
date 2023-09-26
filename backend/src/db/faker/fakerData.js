import { faker } from '@faker-js/faker/locale/es'
import { insertUserModel } from '../../models/users/insertUserModel.js'
import { insertPostModel } from '../../models/posts/insertPostModel.js'
import { insertCommentsModel } from '../../models/comments/insertCommentsModel.js'
import { getDb } from '../../db/getDb.js'

async function generateUsers () {
  for (let id = 2; id < 11; id++) {
    const randomFirstName = faker.person.firstName()
    const randomeLastName = faker.person.lastName()
    const randomFullName = `${randomFirstName} ${randomeLastName}`
    const randomEmail = faker.internet.email({ randomFirstName, randomeLastName })
    const randomUsername = faker.internet.userName()
    const randomPassword = faker.internet.password()
    await insertUserModel(randomUsername, randomEmail, randomPassword, randomFullName)
  }
}

async function generatePosts () {
  for (let id = 2; id < 11; id++) {
    const randomTitle = faker.lorem.words({ min: 3, max: 7 })
    const randomPost = faker.lorem.text()
    const randomImage = faker.image.url()
    const randomCategoryId = faker.number.int({ min: 1, max: 10 })
    const randomUserId = faker.number.int({ min: 1, max: 18 })
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

async function selectPostToComment (commentIdToArray) {
  let connection
  try {
    connection = await getDb()

    const [comments] = await connection.query(`
        SELECT c.id_post
        FROM comments c
        WHERE c.id = ?
      `, [commentIdToArray])

    return comments
  } finally {
    if (connection) connection.release()
  }
}

async function generateIdComments () {
  const commentIdArray = []
  for (let id = 2; id < 51; id++) {
    commentIdArray.push(faker.number.int({ min: 1, max: 50 }))
  }
  return commentIdArray
}

async function generateIdPostToIdComment () {
  const postIdArray = []
  const commentIdArray = await generateIdComments()
  for (let id = 2; id < commentIdArray.lenght; id++) {
    console.log('hola')
    // postIdArray.push(await selectPostToComment(commentIdArray[id]))
  }
  console.log(postIdArray)
}
// async function generateCommentToComments () {

//   const randomComment = faker.lorem.text()
//   const randomUserId = faker.number.int({ min: 1, max: 10 })
//   const randomPostId = selectPostToComment()
//   await insertCommentsModel(commentId, randomComment, randomUserId, randomPostId)
// }
// }

const generateData = async () => {
  await generateUsers()
  await generatePosts()
  await generateComments()
  await generateIdComments()
  await generateIdPostToIdComment()
  // await generateCommentToComments()
  process.exit()
}

generateData()

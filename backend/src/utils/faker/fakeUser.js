import { faker } from '@faker-js/faker/locale/es'
import { insertUserModel } from '../../models/users/insertUserModel.js'

function generateUsers () {
  for (let id = 2; id < 10; id++) {
    const randomFirstName = faker.person.firstName()
    const randomeLastName = faker.person.lastName()
    const randomFullName = `${randomFirstName} ${randomeLastName}`
    const randomEmail = faker.internet.email({ randomFirstName, randomeLastName })
    const randomUsername = faker.internet.userName()
    const randomPassword = faker.internet.password()
    insertUserModel(randomUsername, randomEmail, randomPassword, randomFullName)
  }
}
generateUsers()

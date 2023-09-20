import { selectUserByEmailModel } from '../../models/users/selectUserByEmailModel.js'
import { compare } from 'bcrypt'
import { invalidCredentialsError } from '../../services/errorService.js'
import { sign } from 'jsonwebtoken'

export const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await selectUserByEmailModel(email)

    const validPass = await compare(password, user.password)

    if (!validPass) {
      invalidCredentialsError()
    }

    const tokenInfo = {
      id: user.id,
      role: user.role
    }

    const token = sign(tokenInfo, process.env.SECRET, {
      expiresIn: '1d'
    })
    res.send({
      status: 'ok',
      data: {
        token
      }
    })
  } catch (error) {
    next(error)
  }
}

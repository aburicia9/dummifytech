import { unauthorizedUserError } from '../services/errorService.js'

export const roleUserController = async (req, res, next) => {
  try {
    const { role } = req.user
    if (role === 'moderator' || role === 'admin') {
      return next()
    }
    unauthorizedUserError()
  } catch (error) {
    console.error(error)
    next(error)
  }
}

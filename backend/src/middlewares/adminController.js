import { unauthorizedUserError } from '../services/errorService.js'

export const adminController = async (req, res, next) => {
  try {
    const { role } = req.user
    if (role === 'admin') {
      return next()
    }
    unauthorizedUserError()
  } catch (error) {
    next(error)
  }
}

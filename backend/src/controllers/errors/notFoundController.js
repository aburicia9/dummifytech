// Importamos las funciones de error.
import { notFoundError } from '../../services/errorService.js'

// Función controladora final que retorna un error 404.
export const notFoundController = (req, res, next) => {
  next(notFoundError('ruta'))
}

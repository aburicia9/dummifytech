export function deleteFileError () {
  throw {
    httpStatus: 500, // Internal server error
    code: 'FILE_DELETE_FAILED',
    message: 'Error al eliminar el archivo del disco'
  }
}
export function emailAlreadyRegisteredError () {
  throw {
    httpStatus: 409, // Conflict
    code: 'EMAIL_ALREADY_REGISTERED',
    message: 'El email ya está registrado'
  }
}
export function invalidCredentialsError () {
  throw {
    httpStatus: 401, // Unauthorized
    code: 'INVALID_CREDENTIALS',
    message: 'Credenciales inválidas'
  }
}
export function invalidTokenError () {
  throw {
    httpStatus: 401, // Unauthorized
    code: 'INVALID_TOKEN',
    message: 'Token inválido'
  }
}
export function likeAlreadyExistsError () {
  throw {
    httpStatus: 409, // Conflict
    code: 'LIKE_ALREADY_EXISTS',
    message: 'No se puede dar like más de una vez al mismo elemento'
  }
}
export function notAuthenticatedError () {
  throw {
    httpStatus: 401, // Unauthorized
    code: 'NOT_AUTHENTICATED',
    message: "Debe enviar un token en el header 'Authorization'"
  }
}
export function notFoundError (resource = '') {
  throw {
    httpStatus: 404, // Not found
    code: 'RESOURCE_NOT_FOUND',
    message: `El recurso requerido "${resource}" no existe`
  }
}
export function saveFileError () {
  throw {
    httpStatus: 500, // Internal server error
    code: 'FILE_SAVE_FAILED',
    message: 'Error al guardar el archivo en disco'
  }
}
export function unauthorizedUserError () {
  throw {
    httpStatus: 403, // Forbbiden
    code: 'UNAUTHORIZED',
    message: 'El usuario no está autorizado para hacer esta operación'
  }
}
export function userAlreadyRegisteredError () {
  throw {
    httpStatus: 409, // Conflict
    code: 'USER_ALREADY_REGISTERED',
    message: 'El nombre de usuario ya está registrado'
  }
}
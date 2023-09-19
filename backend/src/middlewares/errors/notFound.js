


notFoundError(resource = '') {
    throw {
        httpStatus: 404, // Not found
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido "${resource}" no existe`,
    };
}

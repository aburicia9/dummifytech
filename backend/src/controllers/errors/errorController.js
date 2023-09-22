export const errorController = (error, req, res, next) => {
  // console.error(error)

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message
  })
}

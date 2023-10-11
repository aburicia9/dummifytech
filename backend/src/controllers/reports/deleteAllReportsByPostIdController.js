import { deleteAllReportsByPostIdModel } from '../../models/reports/deleteAllReportsByPostIdModel.js'

export const deleteAllReportsByPostIdController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await deleteAllReportsByPostIdModel(postId)

    res.send({
      status: 'ok',
      message: 'Todos los reportes de este post borrados'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

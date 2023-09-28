import { deleteReportModel } from '../../models/reports/deleteReportModel.js'

export const deleteReportController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await deleteReportModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: 'REPORTE OFF'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

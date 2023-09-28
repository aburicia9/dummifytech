import { insertReportModel } from '../../models/reports/insertReportModel.js'

export const newReportController = async (req, res, next) => {
  try {
    const { postId } = req.params
    const { commentId } = req.body

    await insertReportModel(postId, req.user.id, commentId)

    res.send({
      status: 'ok',
      message: 'REPORTADO'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

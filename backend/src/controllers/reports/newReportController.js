import { insertReportModel } from '../../models/reports/insertReportModel.js'

export const newReportController = async (req, res, next) => {
  try {
    const { postId } = req.params

    await insertReportModel(postId, req.user.id)

    res.send({
      status: 'ok',
      message: 'REPORTADO'
    })
  } catch (error) {
    next(error)
  }
}

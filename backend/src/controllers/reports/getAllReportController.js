import { selectAllReportModel } from '../../models/reports/selectAllReportModel.js'

export const getAllReportController = async (req, res, next) => {
  try {
    const reports = await selectAllReportModel()

    res.send({
      status: 'ok',
      data: {
        reports
      }
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

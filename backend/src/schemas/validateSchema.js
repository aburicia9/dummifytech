import { zodCustomErrorMap } from './zodCustomErrorMap.js'

export const validateSchema = async (schema, data) => {
  try {
    const result = await schema.safeParseAsync(data, zodCustomErrorMap)

    return result
  } catch (error) {
    console.log(error)
    error.httpStatus = 422
    throw error
  }
}

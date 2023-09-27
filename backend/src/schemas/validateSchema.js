export const validateSchema = async (schema, data) => {
  try {
    const result = await schema.safeParseAsync(data)
    console.log(result)
    return result

    // console.log(result)
  } catch (error) {
    console.log(error)
    error.httpStatus = 422
    throw error
  }
}

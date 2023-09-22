export const validateSchema = async (schema, data) => {
  try {
    const result = await schema.parseAsync(data);
    return result;
  } catch (error) {
    console.log(error);
    error.httpStatus = 422;
    throw error;
  }
};

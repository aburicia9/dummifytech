export const errorFormMessage = (result) => {
  const resultArray = []
  const messageZod = (result.message)
  resultArray.push(messageZod)
  const validation = 'Validation'
  if (!messageZod.includes(validation)) {
    return resultArray
  }
  if (messageZod.includes(validation)) {
    const [errorMessages] = resultArray.map((errorMessage) => {
      const cleanErrorMessage = errorMessage.split(':').slice(1).join().replaceAll(' at ', ' en ').split(';').join()
      const separateErrorMessage = cleanErrorMessage.split(',')
      return separateErrorMessage
    })

    return errorMessages
  }
}

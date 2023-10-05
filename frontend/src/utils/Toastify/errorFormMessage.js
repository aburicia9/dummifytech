export const errorFormMessage = (result) => {
  const resultArray = []
  resultArray.push(result)
  const [errorMessages] = resultArray.map((errorMessage) => {
    const message = errorMessage.message
    const cleanErrorMessage = message.split(':').slice(1).join().split(';').join()

    const separateErrorMessage = cleanErrorMessage.split(',')
    return separateErrorMessage
  })
  return errorMessages
}

import './Toastify.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorFormMessage } from './errorFormMessage'

export const toastifyForm = (result) => {
  if (result.status === 'ok') {
    toast.success(`${result.message}`, {
      position: 'bottom-right',
      autoClose: 15000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  } else if (result.status === 'error') {
    const errorMessages = errorFormMessage(result)
    errorMessages.map((errorMessage) => {
      return toast.error(`${errorMessage}`, {
        position: 'bottom-right',
        autoClose: 15000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    })
  }
}

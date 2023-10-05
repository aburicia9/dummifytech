import './Toastify.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorFormMessage } from './errorFormMessage'

const options = {
  position: 'bottom-right',
  autoClose: 15000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'

}
export const toastifyForm = (result) => {
  if (result.status === 'ok') {
    toast.success(`${result.message}`, options)
  } else if (result.status === 'error') {
    const errorMessages = errorFormMessage(result)
    errorMessages.map((errorMessage) => {
      return toast.error(`${errorMessage}`, options)
    })
  }
}

export const toastifyWarning = (message) => {
  toast.warning(`${message}`, options)
}

export const toastifyInfo = (message) => {
  toast.info(`${message}`, options)
}

export const toastifySuccess = (message) => {
  toast.info(`${message}`, options)
}

export const toastifyError = (message) => {
  toast.error(`${message}`, options)
}

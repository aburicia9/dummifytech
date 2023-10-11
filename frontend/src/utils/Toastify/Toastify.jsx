import './Toastify.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { errorFormMessage } from './errorFormMessage'
import { ButtonComponent } from '../../components/Button/ButtonComponent'

const options = {
  position: 'bottom-right',
  autoClose: 15000,
  hideProgressBar: false,
  closeOnClick: false,
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
  toast.success(`${message}`, options)
}

export const toastifyError = (message) => {
  toast.error(`${message}`, options)
}

export const toastifyConfirm = (message, onConfirm) => {
  toast(
    <div className='div-confirm'>
      <p>{message}</p>
      <ButtonComponent className='button-confirm' handleOnClick={onConfirm} buttonName='Confirmar' />
    </div>
    , options)
}

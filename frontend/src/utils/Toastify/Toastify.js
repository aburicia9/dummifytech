import './Toastify.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const toastifyLogin = (result) => {
  console.log(result)
  if (result.status === 'ok') {
    toast.success('¡Logueado correctamente!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  } else if (result.status === 'error') {
    toast.error(`${result.message}`, {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
  }
}

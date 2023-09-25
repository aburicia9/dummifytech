/* eslint-disable no-throw-literal */
// Importamos las dependencias.
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Importamos el directorio.
import { UPLOADS_DIRS, UPLOADS_DIR_AVATAR, UPLOADS_DIR_CATEGORY, UPLOADS_DIR_POST } from './constants.js'
import { deleteFileError } from '../services/errorService.js'

// Funcion que se va a encargar de eliminar la foto del disco.
export const deletePhoto = async (imgName, type) => {
  try {
    let finalDir
    if (type === UPLOADS_DIRS.AVATAR) finalDir = UPLOADS_DIR_AVATAR
    if (type === UPLOADS_DIRS.POST) finalDir = UPLOADS_DIR_POST
    if (type === UPLOADS_DIRS.CATEGORY) finalDir = UPLOADS_DIR_CATEGORY

    if (!type) throw ('Type not supported')

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    // Creamos la ruta absoluta al archivo que queremos eliminar.
    const imgPath = path.join(__dirname, '..', '..', finalDir, imgName)
    try {
      // El método "access" lanza un error si la ruta especificada no existe.
      await fs.access(imgPath)
    } catch {
      // Si no existe finalizamos la función.
      return
    }
    await fs.unlink(imgPath)
  } catch (error) {
    console.error(error)
    deleteFileError()
  }
}

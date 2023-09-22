// Importamos las dependencias.
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Importamos el directorio.
import { UPLOADS_DIR } from './constants.js'
import { deleteFileError } from '../services/errorService.js'

// Funcion que se va a encargar de eliminar la foto del disco.
export const deletePhoto = async (imgName) => {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    // Creamos la ruta absoluta al archivo que queremos eliminar.
    const imgPath = path.join(__dirname, '..', '..', UPLOADS_DIR, imgName)
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

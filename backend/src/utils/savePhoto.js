// Importamos las dependencias.
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'

// Importamos la constante que contiene el nombre de la carpeta para guardar los archivos.
import { UPLOADS_DIRS, UPLOADS_DIR_AVATAR, UPLOADS_DIR_CATEGORY, UPLOADS_DIR_POST } from './constants.js'
import { saveFileError } from '../services/errorService.js'

// Funcion para guardar los archivos de imagen o avatar.
export const savePhoto = async (img, width, type) => {
  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    let finalDir

    if (type === UPLOADS_DIRS.AVATAR) finalDir = UPLOADS_DIR_AVATAR
    if (type === UPLOADS_DIRS.POST) finalDir = UPLOADS_DIR_POST
    if (type === UPLOADS_DIRS.CATEGORY) finalDir = UPLOADS_DIR_CATEGORY

    // Creamos la ruta absoluta al directorio de subida de archivos.
    const uploadsPath = path.join(__dirname, '..', '..', finalDir)

    try {
      // En este try intetamos acceder a la carpeta donde descargamos los archivos, si no existe lanza un error.
      await fs.access(uploadsPath)
    } catch {
      // Y aqui crea la carpeta.
      await fs.mkdir(uploadsPath)
    }

    // Convertimos la imagen en un tipo sharp para redimensionarla.
    const sharpImg = sharp(img.data)

    // Redimensionamos la imagen.
    sharpImg.resize(width)

    // Generamos un nombre unico para la imagen.
    const imgName = `${uuidv4()}.jpg`

    // Generamos la ruta absoluta a la imagen.
    const imgPath = path.join(uploadsPath, imgName)

    // Guardamos la imagen en el disco.
    await sharpImg.toFile(imgPath)


    // Retornamos el nombre que le hemos dado a la imagen.
    return imgName
  } catch (error) {
    console.error(error)
    saveFileError()
  }
}

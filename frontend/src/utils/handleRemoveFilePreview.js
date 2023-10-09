// Función que se encarga de eliminar la previsualización de la imagen seleccionada en el input file.
export const handleRemoveFilePreview = (fileInputRef, setFile, setPreviewUrl) => {
  setFile(null)
  setPreviewUrl('')

  fileInputRef.current.classList.remove('active')

  if (fileInputRef.current) {
    fileInputRef.current.value = ''
  }
}

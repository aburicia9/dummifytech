// Función que se encarga de previsualizar la imagen seleccionada en el input file.
export const handleAddFilePreview = (e, setFile, setPreviewUrl) => {
  e.target.classList.add('active')

  const selectedFile = e.target.files[0]

  setFile(selectedFile)

  const fileReader = new FileReader()

  fileReader.onload = () => {
    setPreviewUrl(fileReader.result)
  }

  fileReader.readAsDataURL(selectedFile)
}

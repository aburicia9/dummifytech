export const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
  return formattedDate
}

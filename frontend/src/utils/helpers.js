// export const formatDate = (date) => {
//   const formattedDate = new Date(date).toLocaleTimeString('es-ES', {
//     hour: '2-digit',
//     minute: '2-digit',
//     day: '2-digit',
//     month: '2-digit',
//     year: '2-digit'
//   })
//   return formattedDate
// }

export const formatDate = (miliseconds) => {
  const now = new Date()
  const date = new Date(miliseconds)
  const elapsed = now - date
  const seconds = Math.floor(elapsed / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

  if (seconds < 60) {
    return rtf.format(-seconds, 'second')
  } else if (minutes < 60) {
    return rtf.format(-minutes, 'minute')
  } else if (hours < 24) {
    return rtf.format(-hours, 'hour')
  } else {
    return rtf.format(-days, 'day')
  }
}

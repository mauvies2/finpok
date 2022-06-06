export default function formatDate(inputDate: Date | string = new Date()) {
  const date = new Date(inputDate)
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  })

  return dateTimeFormat.format(date)
}

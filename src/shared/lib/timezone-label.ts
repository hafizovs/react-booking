export function getTimezoneLabel(date = new Date()): string {
  const offsetMinutes = -date.getTimezoneOffset()
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const abs = Math.abs(offsetMinutes)
  const hours = String(Math.floor(abs / 60)).padStart(2, '0')
  const minutes = String(abs % 60).padStart(2, '0')
  const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone
  return `${resolved} (UTC${sign}${hours}:${minutes})`
}

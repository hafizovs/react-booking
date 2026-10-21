export type BookingSlot = {
  id: string
  dayIndex: number
  startHour: number
  durationHours: number
  title: string
}

export type TimeRange = {
  dayIndex: number
  startHour: number
  endHour: number
}

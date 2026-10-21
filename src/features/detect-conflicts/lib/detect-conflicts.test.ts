import { describe, expect, it } from 'vitest'

import type { BookingSlot } from '@/entities/booking-slot/model'

import { hasConflict } from './detect-conflicts'

const base: BookingSlot = {
  id: 'a',
  dayIndex: 0,
  startHour: 10,
  durationHours: 2,
  title: 'A',
}

describe('hasConflict', () => {
  it('detects overlapping slots on the same day', () => {
    const other: BookingSlot = { ...base, id: 'b', startHour: 11, durationHours: 1 }
    expect(hasConflict(other, [base])).toBe(true)
  })

  it('allows adjacent non-overlapping slots', () => {
    const other: BookingSlot = { ...base, id: 'b', startHour: 12, durationHours: 1 }
    expect(hasConflict(other, [base])).toBe(false)
  })
})

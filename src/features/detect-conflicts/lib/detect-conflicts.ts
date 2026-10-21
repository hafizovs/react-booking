import type { BookingSlot, TimeRange } from '@/entities/booking-slot/model'

export function slotToRange(slot: BookingSlot): TimeRange {
  return {
    dayIndex: slot.dayIndex,
    startHour: slot.startHour,
    endHour: slot.startHour + slot.durationHours,
  }
}

export function rangesOverlap(a: TimeRange, b: TimeRange): boolean {
  if (a.dayIndex !== b.dayIndex) return false
  return a.startHour < b.endHour && b.startHour < a.endHour
}

export function hasConflict(candidate: BookingSlot, existing: BookingSlot[]): boolean {
  const candidateRange = slotToRange(candidate)
  return existing.some((slot) => slot.id !== candidate.id && rangesOverlap(candidateRange, slotToRange(slot)))
}

export function findConflicts(slots: BookingSlot[]): string[] {
  const ids = new Set<string>()
  for (let i = 0; i < slots.length; i += 1) {
    for (let j = i + 1; j < slots.length; j += 1) {
      if (rangesOverlap(slotToRange(slots[i]!), slotToRange(slots[j]!))) {
        ids.add(slots[i]!.id)
        ids.add(slots[j]!.id)
      }
    }
  }
  return [...ids]
}

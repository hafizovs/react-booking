import { create } from 'zustand'

import type { BookingSlot } from '@/entities/booking-slot/model'
import { hasConflict } from '@/features/detect-conflicts'

type SlotsState = {
  slots: BookingSlot[]
  lastError: string | null
  addSlot: (slot: Omit<BookingSlot, 'id'>) => boolean
  removeSlot: (id: string) => void
}

export const useSlotsStore = create<SlotsState>((set, get) => ({
  slots: [
    {
      id: 'seed-1',
      dayIndex: 1,
      startHour: 9,
      durationHours: 1,
      title: 'Intro call',
    },
  ],
  lastError: null,
  addSlot: (payload) => {
    const candidate: BookingSlot = { ...payload, id: crypto.randomUUID() }
    if (hasConflict(candidate, get().slots)) {
      set({ lastError: 'That slot overlaps an existing booking.' })
      return false
    }
    set({ slots: [...get().slots, candidate], lastError: null })
    return true
  },
  removeSlot: (id) =>
    set({ slots: get().slots.filter((s) => s.id !== id), lastError: null }),
}))

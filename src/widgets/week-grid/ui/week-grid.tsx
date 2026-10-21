import { addDays, format, startOfWeek } from 'date-fns'
import { useMemo } from 'react'

import { findConflicts } from '@/features/detect-conflicts'
import { useSlotsStore } from '@/features/manage-slots/model/slots-store'
import { cn } from '@/shared/lib/cn'

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export function WeekGrid() {
  const slots = useSlotsStore((s) => s.slots)
  const addSlot = useSlotsStore((s) => s.addSlot)
  const removeSlot = useSlotsStore((s) => s.removeSlot)
  const lastError = useSlotsStore((s) => s.lastError)

  const weekStart = useMemo(() => startOfWeek(new Date(), { weekStartsOn: 1 }), [])
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  )
  const conflictIds = useMemo(() => new Set(findConflicts(slots)), [slots])

  const slotAt = (dayIndex: number, hour: number) =>
    slots.find((s) => s.dayIndex === dayIndex && s.startHour === hour)

  const onCellClick = (dayIndex: number, hour: number) => {
    const existing = slotAt(dayIndex, hour)
    if (existing) {
      removeSlot(existing.id)
      return
    }
    addSlot({
      dayIndex,
      startHour: hour,
      durationHours: 1,
      title: 'New booking',
    })
  }

  return (
    <div className="overflow-x-auto">
      {lastError && <p className="mb-2 text-sm text-red-600">{lastError}</p>}
      <div className="grid min-w-[720px] grid-cols-[64px_repeat(7,1fr)] gap-px rounded-lg border border-slate-200 bg-slate-200">
        <div className="bg-slate-50 p-2 text-xs font-medium text-slate-500">Time</div>
        {days.map((day) => (
          <div key={day.toISOString()} className="bg-slate-50 p-2 text-center text-xs font-medium">
            {format(day, 'EEE d MMM')}
          </div>
        ))}
        {HOURS.flatMap((hour) => [
          <div key={`label-${hour}`} className="bg-white p-2 text-xs text-slate-500">
            {String(hour).padStart(2, '0')}:00
          </div>,
          ...days.map((day, dayIndex) => {
            const slot = slotAt(dayIndex, hour)
            const conflict = slot ? conflictIds.has(slot.id) : false
            return (
              <button
                key={`${day.toISOString()}-${hour}`}
                type="button"
                onClick={() => onCellClick(dayIndex, hour)}
                className={cn(
                  'min-h-10 bg-white p-1 text-left text-xs transition hover:bg-blue-50',
                  slot && 'bg-blue-100 font-medium text-blue-900',
                  conflict && 'ring-2 ring-red-400',
                )}
                title={slot ? 'Click to remove' : 'Click to book 1h slot'}
              >
                {slot?.title ?? ''}
              </button>
            )
          }),
        ])}
      </div>
      <p className="mt-2 text-xs text-slate-500">Click an empty cell to create a 1-hour slot; click again to remove.</p>
    </div>
  )
}

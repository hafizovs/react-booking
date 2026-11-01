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

  const stickyTimeHeader =
    'sticky left-0 z-10 bg-slate-50 shadow-[4px_0_6px_-4px_rgba(15,23,42,0.12)]'
  const stickyTimeLabel =
    'sticky left-0 z-10 bg-white shadow-[4px_0_6px_-4px_rgba(15,23,42,0.12)]'

  return (
    <div className="min-w-0">
      {lastError && <p className="mb-2 text-sm text-red-600">{lastError}</p>}
      <p className="mb-2 text-xs text-slate-500 md:hidden">
        Swipe horizontally to see all days.
      </p>
      <div
        className="overflow-x-auto overscroll-x-contain rounded-lg [-webkit-overflow-scrolling:touch]"
        tabIndex={0}
        role="region"
        aria-label="Weekly schedule grid"
      >
        <div className="grid w-full min-w-[720px] grid-cols-[3rem_repeat(7,minmax(4.5rem,1fr))] gap-px border border-slate-200 bg-slate-200 md:min-w-0 md:grid-cols-[4rem_repeat(7,minmax(0,1fr))]">
          <div
            className={cn(
              'p-2 text-[10px] font-medium text-slate-500 sm:text-xs',
              stickyTimeHeader,
            )}
          >
            Time
          </div>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className="bg-slate-50 p-1.5 text-center text-[10px] font-medium leading-tight sm:p-2 sm:text-xs"
            >
              <span className="md:hidden">{format(day, 'EEE d')}</span>
              <span className="hidden md:inline">{format(day, 'EEE d MMM')}</span>
            </div>
          ))}
          {HOURS.flatMap((hour) => [
            <div
              key={`label-${hour}`}
              className={cn(
                'p-2 text-[10px] text-slate-500 sm:text-xs',
                stickyTimeLabel,
              )}
            >
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
                    'min-h-11 touch-manipulation bg-white p-1.5 text-left text-[10px] transition hover:bg-blue-50 active:bg-blue-100 sm:min-h-10 sm:p-1 sm:text-xs',
                    slot && 'bg-blue-100 font-medium text-blue-900 hover:bg-blue-200',
                    conflict && 'ring-2 ring-red-400 ring-inset',
                  )}
                  title={slot ? 'Click to remove' : 'Click to book 1h slot'}
                >
                  {slot?.title ?? ''}
                </button>
              )
            }),
          ])}
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        Click an empty cell to create a 1-hour slot; click again to remove.
      </p>
    </div>
  )
}

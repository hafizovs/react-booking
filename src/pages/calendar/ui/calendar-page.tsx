import { getTimezoneLabel } from '@/shared/lib/timezone-label'
import { WeekGrid } from '@/widgets/week-grid'

export function CalendarPage() {
  return (
    <div className="mx-auto min-w-0 max-w-5xl px-3 py-4 sm:px-4 md:py-6">
      <header className="mb-3 sm:mb-4">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Weekly booking
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 sm:mt-0">
          Click cells to add or remove one-hour appointments. Conflicts are highlighted.
        </p>
        <p className="mt-1 text-xs text-slate-500">Timezone: {getTimezoneLabel()}</p>
      </header>
      <WeekGrid />
    </div>
  )
}

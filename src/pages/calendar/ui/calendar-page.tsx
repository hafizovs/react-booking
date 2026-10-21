import { getTimezoneLabel } from '@/shared/lib/timezone-label'
import { WeekGrid } from '@/widgets/week-grid'

export function CalendarPage() {
  return (
    <div className="mx-auto max-w-5xl p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold text-slate-900">Weekly booking</h1>
        <p className="text-sm text-slate-600">
          Click cells to add or remove one-hour appointments. Conflicts are highlighted.
        </p>
        <p className="mt-1 text-xs text-slate-500">Timezone: {getTimezoneLabel()}</p>
      </header>
      <WeekGrid />
    </div>
  )
}

# 07-booking — agent instructions

Weekly booking grid (Vite + FSD). Parent: `../AGENTS.md`.

## Commands

- `pnpm install` · `pnpm dev` (port **5007**) · `pnpm check` · `pnpm build`

## FSD map

- `src/pages/calendar`
- `src/widgets/week-grid`
- `src/features/manage-slots`, `detect-conflicts`
- `src/entities/booking-slot`
- `src/shared/lib/timezone-label`

## Done when

`pnpm check` green; click-to-book works; overlaps blocked and highlighted.

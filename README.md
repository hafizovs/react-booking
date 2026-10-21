# 07 — Booking calendar

**Live:** https://hafizovs.github.io/react-booking/

Week-view scheduler with click-to-create slots and conflict detection for a React CV portfolio.

**CV line:** scheduling UI with date-fns, overlap detection, and timezone labeling

## Stack

Vite, React 19, TypeScript, Tailwind CSS, date-fns, Zustand, Vitest. Feature-Sliced Design.


## How to run

```bash
# from portfolio_react/
pnpm install
pnpm dev
```

Open **http://localhost:5007**

See also [docs/RUNBOOK.md](../docs/RUNBOOK.md).

## Scripts

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

## Manual demo

1. Review the current week grid (Monday start) and timezone label.
2. Click an empty hour cell to add a 1-hour booking.
3. Click a filled cell to remove it.
4. Try booking an overlapping hour — creation is blocked with an error message.
5. Seed slot overlaps show a red ring via conflict detection.

## Interview talking points

- Pure interval overlap helpers vs UI state (Zustand)
- date-fns `startOfWeek` for locale-aware grids
- Displaying `Intl` timezone for user clarity

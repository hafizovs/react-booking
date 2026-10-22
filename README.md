## Live demo

https://hafizovs.github.io/react-booking/

# Booking calendar

Week-view scheduler with click-to-create slots and conflict detection — date-fns, Zustand.

## Scripts

```bash
pnpm install
pnpm dev          # http://localhost:5007
pnpm check
pnpm build
```

## Manual demo

1. Review the current week grid (Monday start) and timezone label.
2. Click an empty hour cell to add a 1-hour booking.
3. Click a filled cell to remove it.
4. Try an overlapping hour — creation is blocked.
5. Seed overlaps show a red ring via conflict detection.

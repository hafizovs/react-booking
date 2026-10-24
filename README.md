## Live demo

https://hafizovs.github.io/react-booking/

# Booking calendar

## About

Week-view scheduler with click-to-create slots and conflict detection, built with date-fns and Zustand. The grid starts on Monday and shows a timezone label. Empty hours become one-hour bookings, filled cells clear them, and overlapping hours stay blocked.

## Capabilities

- Monday-start week grid
- Timezone label
- Click an empty hour to add a 1-hour booking
- Click a filled cell to remove that booking
- Overlap check that blocks the new booking
- Red ring on seeded conflicts

## Functionality

- Review the current week grid and the timezone label
- Add a one-hour booking in an empty cell, or clear a filled cell
- Try an overlapping hour and see creation blocked
- Spot seeded overlaps by the red ring

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

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Architecture

Linkeep is a luggage storage service platform for tourists in Seoul (Myeongdong/Hongdae areas). Built with Vite, React, React Router, styled-components, and Supabase.

### Key Routes

- `/` - Consumer-facing homepage listing available storage spots by area
- `/host` - Host center for viewing reservations (requires host_token)
- `/spot/:token` - Individual spot booking page accessed via QR code

### Project Structure

```
src/
  main.tsx              # Entry point
  App.tsx               # Route definitions
  api/
    supabase.ts         # Supabase client and API functions
  components/
    common/             # Reusable components (Header, Button, Input, Card)
  pages/
    user/               # User-facing pages
      HomePage/         # index.tsx + style.ts
      SpotPage/         # index.tsx + style.ts
    host/               # Host-facing pages
      HostPage/         # index.tsx + style.ts
  styles/
    GlobalStyle.ts      # Global CSS reset
    theme.ts            # Design tokens (colors, spacing, etc.)
  types/
    index.ts            # TypeScript types and constants
```

### Data Layer

- **API functions**: `src/api/supabase.ts` - spotApi, reservationApi
- **Database tables**:
  - `spots` - Storage locations (name, area, address, hours, pricing, host_token, is_active)
  - `reservations` - Bookings (host_token, spot_id, name, bags, timestamps)

### Environment Variables

Required in `.env.local`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### UI Patterns

- Each page/component uses `index.tsx` + `style.ts` pattern
- Styled-components with theme tokens from `styles/theme.ts`
- Mobile-first responsive design
- Korean language UI with area mapping (myeongdong→명동, hongdae→홍대)

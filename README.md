# E-Broker Frontend Monorepo

This is a Next.js monorepo for E-Broker E-learning platform with shadcn/ui.

## Project Structure

```
frontend/
├── apps/
│   ├── admin/      # Admin dashboard (Port 3001)
│   ├── teacher/    # Teacher portal (Port 3002)
│   └── student/    # Student portal (Port 3003)
└── packages/
    ├── ui/         # Shared UI components (shadcn/ui)
    ├── eslint-config/
    └── typescript-config/
```

## Environment Setup

### 1. Copy environment files

```bash
# Copy example files to create your local environment
cp apps/admin/.env.example apps/admin/.env.local
cp apps/teacher/.env.example apps/teacher/.env.local
cp apps/student/.env.example apps/student/.env.local
```

### 2. Configure environment variables

Each app has its own `.env.local` file with specific configurations:

- **Admin** (Port 3001): User management, reports, system settings
- **Teacher** (Port 3002): Course creation, grading, class management
- **Student** (Port 3003): Game mode, leaderboard, learning activities

See `.env.example` files for all available variables.

## Development

### Run all apps simultaneously

```bash
pnpm dev
```

### Run individual apps

```bash
# Admin app on port 3001
pnpm dev:admin

# Teacher app on port 3002
pnpm dev:teacher

# Student app on port 3003
pnpm dev:student
```

### Access the apps

- Admin: http://localhost:3001
- Teacher: http://localhost:3002
- Student: http://localhost:3003

## Building

### Build all apps

```bash
pnpm build
```

### Build individual apps

```bash
pnpm build:admin
pnpm build:teacher
pnpm build:student
```

## Adding components

To add components to your app, run the following command at the root of your app:

```bash
pnpm dlx shadcn@latest add button -c apps/admin
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```

## Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript 5.9**
- **Tailwind CSS 4**
- **shadcn/ui** components
- **Turbopack** for fast development
- **pnpm** workspace

# Cloudflare Full-Stack Starter

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Ohfiftyb252/sonicforge-the-beat-battle-arena)

A production-ready full-stack starter template featuring React, TypeScript, Tailwind CSS, and Cloudflare Workers with Durable Objects for scalable stateful entities.

## Description

This template provides a complete foundation for building modern web applications on Cloudflare's edge platform. It includes a React frontend with shadcn/ui components, a Hono-powered API layer, and pre-built entity patterns using Durable Objects for persistent storage and real-time features.

The included demo showcases a lightweight chat system with user management, demonstrating best practices for indexed entities, transactional updates, and API routing.

## Key Features

- **Durable Objects Entities**: IndexedEntity pattern for scalable CRUD operations with automatic indexing
- **Full-Stack Type Safety**: Shared TypeScript types between frontend and worker
- **Modern React Stack**: React 18, TanStack Query, React Router, and Immer for state management
- **Beautiful UI**: shadcn/ui components, Tailwind CSS, dark mode support, and smooth animations
- **Edge-First Architecture**: Hono router with CORS, logging, and error handling
- **Developer Experience**: Vite dev server, hot reload, comprehensive TypeScript configs, and ESLint

## Technology Stack

**Frontend**
- React 18 + TypeScript
- Vite
- TanStack React Query
- React Router 6
- Tailwind CSS + shadcn/ui (New York style)
- Lucide icons, Sonner toasts, Framer Motion

**Backend / Platform**
- Cloudflare Workers
- Hono framework
- Durable Objects (GlobalDurableObject for KV-like storage)
- TypeScript with wrangler

**Utilities**
- Immer, Zod, date-fns, UUID

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+
- A Cloudflare account (for deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
bun install
```

### Development

```bash
# Start the development server
bun dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

### Available Scripts

- `bun dev` — Start Vite dev server with Workers integration
- `bun build` — Build production assets
- `bun preview` — Preview production build locally
- `bun deploy` — Deploy to Cloudflare Workers
- `bun lint` — Run ESLint
- `bun cf-typegen` — Generate Cloudflare Workers types

## Project Structure

```
src/           # React frontend (pages, components, hooks)
worker/        # Cloudflare Workers (Hono routes, entities, core-utils)
shared/        # Shared TypeScript types and mock data
```

Key implementation files:
- `worker/entities.ts` — UserEntity and ChatBoardEntity examples
- `worker/user-routes.ts` — API endpoints for users, chats, and messages
- `worker/core-utils.ts` — Durable Object helpers and IndexedEntity base class

## API Endpoints

- `GET /api/health` — Health check
- `GET /api/users` — List users (paginated)
- `POST /api/users` — Create user
- `GET /api/chats` — List chats
- `POST /api/chats` — Create chat
- `GET /api/chats/:chatId/messages` — List messages
- `POST /api/chats/:chatId/messages` — Send message
- Delete endpoints for single and batch operations also available

## Deployment

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Ohfiftyb252/sonicforge-the-beat-battle-arena)

### Deploy to Cloudflare

```bash
# Build and deploy
bun run deploy
```

Or use the Cloudflare dashboard / Wrangler CLI directly:

```bash
wrangler deploy
```

The `wrangler.jsonc` file is pre-configured with Durable Object bindings and migrations. After the first deployment, migrations will be applied automatically.

## Customization

1. Replace the placeholder content in `src/pages/HomePage.tsx`
2. Extend or modify entities in `worker/entities.ts`
3. Add new routes in `worker/user-routes.ts`
4. Customize styling in `src/index.css` and `tailwind.config.js`

## License

This project is provided as a starter template. See individual dependencies for their respective licenses.

---

Built with Cloudflare Workers and the edge platform.
# Study Planner - AI Coding Agent Instructions

## Architecture Overview

**Study Planner** is a monorepo with separate `backend` (Express + TypeScript + MongoDB) and `frontend` (React + TypeScript + Vite) applications.

### Backend Architecture (src/)
- **controllers/**: Route handlers (signup, login, getMe) with validation and error handling
- **middlewares/**: Authentication middleware verifies JWT tokens from Bearer header
- **models/**: Mongoose schemas (User with email uniqueness, password hash)
- **routes/**: Express Router mounting controllers with middleware
- **config/**: Environment loading (env.ts) and MongoDB connection (db.ts)
- **utils/**: Utility functions like generateToken (JWT with 1h expiry)

### Frontend Architecture (src/)
- React components built with Chakra UI + Emotion
- Vite dev server with HMR enabled
- Uses `import.meta.env.VITE_API_URL` for backend communication

## Key Development Workflows

### Backend
```bash
npm run dev        # Start ts-node-dev in /backend (auto-restarts on changes)
npm run build      # Compile TypeScript to dist/
npm start          # Run compiled JS from dist/
```

### Frontend
```bash
npm run dev        # Start Vite dev server (port typically 5173)
npm run build      # Compile TS + build Vite bundle
npm run lint       # Run ESLint on codebase
npm run preview    # Preview production build
```

## Authentication Flow (Critical Pattern)

1. **Signup/Login** (`authController.ts`):
   - Hash password with bcryptjs (salt rounds: 10)
   - Return JWT token with userId claim (1h expiry)
   - User object sent back with sanitized fields (id, name, email, timezone, profession)

2. **Protected Routes** (`authMiddleware.ts`):
   - Extract token from `Authorization: Bearer <token>` header
   - Verify with `JWT_SECRET` from env
   - Attach decoded `userId` to `req.userId` for downstream handlers
   - Return 401 for missing/invalid tokens

3. **Frontend Integration** (App.tsx pattern):
   - Use `VITE_API_URL` environment variable for API calls
   - Store JWT in localStorage or memory (implementation pending)

## Critical Configuration & Environment

### Backend Environment Variables
- `MONGO_URI`: MongoDB connection string (required)
- `JWT_SECRET`: Secret for signing JWTs (required, checked at startup)
- `PORT`: Server port (default: 8000)

### Frontend Environment Variables
- `VITE_API_URL`: Backend API base URL (used in fetch calls)

### TypeScript Setup
- Backend: `commonjs` modules, ES2020 target, strict mode enabled
- Frontend: `esnext` modules, tsconfig.app.json for app code, tsconfig.node.json for build config

## Database Schema Pattern

User model (`models/User.ts`):
- email: unique, lowercased (prevent duplicate accounts)
- passwordHash: never stored plaintext
- timezone, profession: optional profile fields
- timestamps: auto-managed createdAt/updatedAt

## Common Patterns & Conventions

1. **Error Handling**: Controllers catch and return HTTP status codes (400, 401, 409, 500)
2. **Email Normalization**: Always lowercase emails before queries/storage to ensure uniqueness
3. **Request/Response Types**: Extend Express Request/Response interfaces (e.g., AuthRequest with userId)
4. **Async Controllers**: Mark route handlers with async; use try-catch
5. **JWT Token Format**: `{ userId: string }` payload, 1-hour expiry

## File Organization Principles

- **backend/src/**: Organize by responsibility (controllers, middlewares, models, routes, config)
- **frontend/src/**: React components live in src/; use Chakra UI for styling
- **Separable concerns**: Don't mix business logic in middleware or routes

## Integration Points to Know

- Frontend fetches `/api/health` on mount to verify backend connectivity
- Auth endpoints: POST `/api/auth/signup`, POST `/api/auth/login`, GET `/api/auth/me`
- CORS enabled on backend for frontend communication

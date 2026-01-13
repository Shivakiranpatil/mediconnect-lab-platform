# MediConnect - Lab Test Discovery & Booking Platform

## Overview

MediConnect is a healthcare platform that enables users to discover, browse, and book lab tests and health bundles. The application features an AI-powered discovery flow that recommends personalized test packages based on user health profiles. It supports three user types: regular users, lab administrators, and platform administrators, each with their own portal and dashboard.

The platform connects users with partner laboratories across the UAE, allowing home sample collection or lab visits, with automated lab assignment and booking management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with custom path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints defined in shared/routes.ts with Zod validation
- **Session Management**: express-session with PostgreSQL store (connect-pg-simple)

### Database Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: shared/schema.ts (shared between client and server)
- **Migrations**: Managed via drizzle-kit with migrations in /migrations folder

### Key Data Models
- **Users**: Authentication with roles (user, admin, lab_admin)
- **Bundles**: Health test packages with pricing and descriptions
- **Tests**: Individual lab tests with biomarkers and preparation info
- **Appointments**: Booking records linking users, bundles, and labs
- **Partner Labs**: Laboratory information with ratings and locations
- **AI System**: Questions, rule sets, and mapping rules for recommendations

### AI Integration
- **Chat System**: OpenAI-powered conversational interface via Replit AI Integrations
- **Image Generation**: gpt-image-1 model for image creation
- **Recommendation Engine**: Rule-based AI that maps user health profile answers to appropriate test bundles

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: esbuild bundles server code, Vite builds client to dist/public
- **Script**: Custom build.ts handles both client and server compilation

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via DATABASE_URL environment variable
- **Session Storage**: PostgreSQL-backed session store using connect-pg-simple

### AI Services
- **OpenAI API**: Via Replit AI Integrations (AI_INTEGRATIONS_OPENAI_API_KEY, AI_INTEGRATIONS_OPENAI_BASE_URL)
- **Models Used**: GPT for chat, gpt-image-1 for image generation

### UI Components
- **Radix UI**: Extensive use of Radix primitives for accessible components
- **shadcn/ui**: Pre-styled component system built on Radix

### Key NPM Packages
- **drizzle-orm / drizzle-kit**: Database ORM and migration tooling
- **zod**: Runtime type validation for API inputs/outputs
- **react-hook-form**: Form state management with @hookform/resolvers
- **date-fns**: Date manipulation utilities
- **framer-motion**: Animation library for transitions
- **p-limit / p-retry**: Rate limiting and retry logic for batch AI operations
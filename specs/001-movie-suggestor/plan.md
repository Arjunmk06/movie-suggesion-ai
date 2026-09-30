# Implementation Plan: Movie Suggestor UI + Recommendation Flow

**Branch**: `001-movie-suggestor` | **Date**: 2026-09-25 | **Spec**: `/specs/001-movie-suggestor/spec.md`

**Input**: Feature specification for a responsive React movie recommendation experience backed by the Express API.

## Summary

Build a lightweight full-stack movie recommendation app where users enter a mood, genre, and desired count, then submit a recommendation request to the backend. The frontend uses React + TypeScript, presents a clean responsive layout, and renders movie cards from the API payload. The backend exposes a POST endpoint at `/api/v1/recommend` and validates request input before returning structured movie suggestions.

## Technical Context

**Language/Version**: TypeScript 5.x; Node.js 18+

**Primary Dependencies**:
- Frontend: React 18, Vite, TypeScript
- Backend: Express 5, Zod, dotenv
- AI integration: LangChain, Groq/Google model adapters

**Storage**: N/A for the current feature; request/response payloads are in-memory and API-driven.

**Testing**: Manual validation for MVP; future automation may include Vitest or Playwright, but this is not required for the initial build.

**Target Platform**: Web application running locally in development and deployable to a standard Node/Vite environment.

**Project Type**: Web application with separate frontend and backend services

**Performance Goals**:
- Recommendation request completes within a reasonable user-wait window for a single-screen app
- UI remains responsive during loading and error states
- API request payload stays small and predictable

**Constraints**:
- Frontend must use React.js as the framework
- UI should stay simple, readable, and responsive across screen sizes
- API base URL must be configurable via environment variable
- Minimal dependency footprint preferred

**Scale/Scope**:
- Single user flow with a recommendation form and card results list
- 3 to 5 movie recommendations per response
- Support for a single backend endpoint and a single frontend page

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Clean Code: Pass. Small, explicit modules for controller, service, schema, and UI components will keep business logic readable.
- Simple User Experience: Pass. The flow is a single form + result list with minimal steps and clear labels.
- Responsive and Accessible Design: Pass. The layout is mobile-friendly and uses clear spacing, readable text, and large touch targets.
- React.js First: Pass. The frontend is implemented using React + TypeScript.
- Minimal Dependency Discipline: Pass. Dependencies are limited to the frontend toolchain, express, zod, and the recommendation AI integration needed for the feature.

## Project Structure

### Documentation (this feature)

```text
specs/001-movie-suggestor/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── recommendation-api.md
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── controller/
│   ├── router/
│   ├── schema/
│   ├── service/
│   └── index.ts
└── package.json

frontend/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── .env.example
└── dist/
```

**Structure Decision**: Use a two-service architecture with a dedicated backend API and a React + TypeScript frontend. The backend owns validation and AI recommendation generation; the frontend owns the form, state, error handling, and responsive display.

## Complexity Tracking

No constitution violations identified for the current phase. The project remains within the intended scope and dependency boundaries.

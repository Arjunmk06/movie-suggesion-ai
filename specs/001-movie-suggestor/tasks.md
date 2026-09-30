# Tasks: Movie Suggestor UI + Recommendation Flow

**Input**: Design documents from `/specs/001-movie-suggestor/`

**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation.

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create project structure per implementation plan in `backend/` and `frontend/`
- [ ] T002 Initialize backend dependencies and configuration for Express + TypeScript
- [ ] T003 Initialize frontend dependencies and configuration for React + TypeScript + Vite
- [ ] T004 [P] Configure environment variable handling for the API URL and local startup settings

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T005 Set up backend app entrypoint and middleware for JSON parsing and CORS
- [ ] T006 Implement backend router and route registration for `/api/v1/recommend`
- [ ] T007 Create request validation schema using Zod for `userPrompt`, `genre`, `mood`, and `count`
- [ ] T008 Implement recommendation service integration with the AI model layer
- [ ] T009 [P] Confirm backend response structure matches the API contract
- [ ] T010 [P] Configure frontend API client base URL from `VITE_RECOMMEND_API_URL`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Frontend recommendation form and results UI (Priority: P1) 🎯 MVP

**Goal**: Let users enter their mood and preferences and see movie recommendations from the backend.

**Independent Test**: Open the app, fill in form values, submit a request, and verify the recommendations render in cards.

### Implementation for User Story 1

- [ ] T011 [P] [US1] Build the left-side form layout in `frontend/src/App.tsx` with mood text, genre select, mood select, and count select
- [ ] T012 [P] [US1] Add form state handling and submission logic in `frontend/src/App.tsx`
- [ ] T013 [P] [US1] Create the recommendation API request payload and fetch logic using `VITE_RECOMMEND_API_URL`
- [ ] T014 [US1] Add loading and error notification handling for failed API responses
- [ ] T015 [US1] Render recommendation cards in `frontend/src/App.tsx` with title, rating, year, genre, cast, and reason fields
- [ ] T016 [US1] Scope and apply responsive styling in `frontend/src/index.css` for the requested layout
- [ ] T017 [US1] Update documentation and environment file examples for frontend setup in `frontend/.env.example`

**Checkpoint**: At this point, the frontend flow should be fully usable independently.

---

## Phase 4: User Story 2 - Backend recommendation endpoint and validation (Priority: P1)

**Goal**: Accept a recommendation request, validate it, and return structured movie results.

**Independent Test**: Send a POST request to `/api/v1/recommend` with a valid payload and confirm a successful response object.

### Implementation for User Story 2

- [ ] T018 [P] [US2] Implement controller logic in `backend/src/controller/langchain.controller.ts`
- [ ] T019 [P] [US2] Register the route in `backend/src/router/langchain.router.ts`
- [ ] T020 [US2] Connect the validated request to the movie recommendation service in `backend/src/service/langchain.service.ts`
- [ ] T021 [US2] Ensure structured output matches `movieRecommendationsSchema` in `backend/src/schema/movies.schema.ts`
- [ ] T022 [US2] Add error handling for validation and AI failures with readable API responses

**Checkpoint**: The backend endpoint should work on its own and return the intended structured payload.

---

## Phase 5: Integration and polish

- [ ] T023 Run end-to-end frontend and backend verification using the local dev flow
- [ ] T024 Confirm the app matches the requested layout and light/warm visual treatment
- [ ] T025 [P] Verify environment configuration is easy to update later without code changes
- [ ] T026 [P] Clean up any leftover console noise or obvious implementation issues

---

## Dependencies & Execution Order

- Phase 1 Setup must be completed before any story work begins.
- Phase 2 Foundational tasks must be complete before story implementation begins.
- User Story 1 and User Story 2 can be worked on in parallel if needed, but both must be validated before final integration.

### Parallel opportunities

- `T004` can run in parallel with frontend/backend project initialization tasks.
- `T009` and `T010` are independent environment/config checks.
- `T011` through `T017` are related to the same story and can be completed in parallel when appropriate.
- `T018` through `T022` are related to backend story work and can be completed in parallel if team capacity allows.

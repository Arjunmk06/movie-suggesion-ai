# Research Notes

## Decision: UI pattern

The recommendation experience should stay as a single page with two panels: a form on the left and results on the right. This approach matches the requested UX and keeps the interaction simple while preserving a clean visual hierarchy.

## Decision: Environment-driven API configuration

The frontend should read the backend endpoint from an environment variable such as `VITE_RECOMMEND_API_URL` with a local fallback to `http://localhost:3000/api/v1/recommend`.

## Decision: Request/response validation

The backend uses Zod to validate the recommendation request payload. This keeps invalid input from reaching the AI layer and produces predictable API errors.

## Decision: Response rendering

Movies are rendered as cards with the title, rating badge, year, genres, cast list, and reason to watch. The layout is responsive and uses a consistent grid pattern for 2-5 results.

## Decision: Error handling

API failures and validation problems should surface a clear notification message without crashing the UI. The current phase prioritizes straightforward, user-visible feedback.

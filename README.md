# Movie Suggestor

A movie recommendation app that suggests films from a user's mood, preferences, and selected genre. The frontend is built with React and Vite; the backend uses Express and LangChain with Groq.

## Features

- Get movie recommendations from a free-form mood or preference description.
- Filter recommendations by genre and mood, and choose how many results to return.
- Reject clearly unrelated requests before generating recommendations.
- Show request progress and validation or API errors in the frontend.

## Requirements

- Node.js and npm
- A Groq API key

## Run Locally

Install and start the backend in one terminal from the repository root:

```sh
cd backend
npm install
export GROQ_API_KEY="your-groq-api-key"
npm run dev
```

The backend listens on `http://localhost:3000` by default. Set `PORT` to use a different port.

Install and start the frontend in a second terminal:

```sh
cd frontend
npm install
cp .env.example .env
npm run dev
```

Vite prints the local frontend URL when it starts. The example environment file points the frontend to `http://localhost:3000/api/v1/recommend`; set `VITE_RECOMMEND_API_URL` in `frontend/.env` if the backend uses a different URL. Keep API keys out of committed files.

## API

`POST /api/v1/recommend` accepts JSON with a non-empty `userPrompt`, `genre`, and `mood`, plus a `count` from 2 to 5:

```json
{
	"userPrompt": "Something cozy and thoughtful",
	"genre": "Drama",
	"mood": "relaxed",
	"count": 3
}
```

Successful responses contain a `data.movies` array. Invalid requests return a validation error; unrelated requests return HTTP 422 with the `OUT_OF_SCOPE` code. The backend health check is available at `GET /health`.

## Build Frontend

```sh
cd frontend
npm run build
```

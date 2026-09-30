# Quickstart

## Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev -- --host 0.0.0.0
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Endpoint

POST `http://localhost:3000/api/v1/recommend`

Example body:

```json
{
  "userPrompt": "test",
  "genre": "Thriller",
  "mood": "relaxed",
  "count": 3
}
```

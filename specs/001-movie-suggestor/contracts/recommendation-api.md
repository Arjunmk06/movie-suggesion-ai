# Recommendation API Contract

## POST /api/v1/recommend

### Request

Content-Type: application/json

```json
{
  "userPrompt": "test",
  "genre": "Thriller",
  "mood": "relaxed",
  "count": 3
}
```

### Success Response

Status: 200 OK

```json
{
  "data": {
    "movies": [
      {
        "title": "Zodiac",
        "year": 2007,
        "genre": ["Thriller", "Crime", "Drama"],
        "cast": ["Jake Gyllenhaal", "Robert Downey Jr.", "Mark Ruffalo"],
        "reason": "A methodical, atmospheric crime thriller...",
        "rating": 7.7
      }
    ]
  }
}
```

### Error Response

Status: 400 or 500

```json
{
  "error": "Validation failed",
  "details": [
    {
      "path": ["genre"],
      "message": "genre cannot empty"
    }
  ]
}
```

### Notes
- Request input is validated using Zod before the model call executes.
- The frontend should show an inline error message if the API returns a non-success status.
- The API base URL must be configurable via environment settings.

# Data Model

## Recommendation Request

```ts
type RecommendationRequest = {
  userPrompt: string
  genre: string
  mood: string
  count: number
}
```

### Constraints
- `userPrompt` must be a non-empty string
- `genre` must be a non-empty string
- `mood` must be a non-empty string
- `count` must be between 2 and 5

## Movie Recommendation

```ts
type MovieRecommendation = {
  title: string
  year: number
  genre: string[]
  cast: string[]
  reason: string
  rating: number
}
```

## API Response

```ts
type RecommendationResponse = {
  data: {
    movies: MovieRecommendation[]
  }
}
```

## Error Response

```ts
type ApiErrorResponse = {
  error: string
  details?: unknown
}
```

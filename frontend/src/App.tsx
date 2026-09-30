import { FormEvent, useMemo, useState } from 'react'

type Movie = {
  title: string
  year: number
  genre: string[]
  cast: string[]
  reason: string
  rating: number
}

type RecommendationApiResponse = {
  data?: {
    movies?: Movie[]
  }
  code?: string
  error?: string
  details?: unknown
}

type FormState = {
  userPrompt: string
  genre: string
  mood: string
  count: number
}

const genreOptions = [
  'Action',
  'Comedy',
  'Drama',
  'Thriller',
  'Horror',
  'Sci-Fi',
  'Romance',
  'Animation',
  'Documentary',
  'Fantasy',
]

const moodOptions = ['Relaxed', 'Happy', 'Emotional', 'Adventurous', 'Focused', 'Excited']
const countOptions = [2, 3, 4, 5]

const initialForm: FormState = {
  userPrompt: '',
  genre: '',
  mood: 'Relaxed',
  count: 3,
}

const apiUrl = import.meta.env.VITE_RECOMMEND_API_URL ?? 'http://localhost:3000/api/v1/recommend'

function App() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const summaryText = useMemo(() => {
    if (movies.length === 0) return 'No recommendations yet.'
    if (movies.length === 1) return '1 movie match found.'
    return `${movies.length} movie matches found.`
  }, [movies])

  const handleInputChange = (field: keyof FormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setErrorMessage('')

    if (!form.userPrompt.trim()) {
      setErrorMessage('Please describe your mood or what you want to watch.')
      return
    }

    if (!form.genre) {
      setErrorMessage('Please select a genre.')
      return
    }

    if (!form.mood) {
      setErrorMessage('Please select a mood.')
      return
    }

    setMovies([])
    setLoading(true)

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPrompt: form.userPrompt.trim(),
          genre: form.genre,
          mood: form.mood.toLowerCase(),
          count: Number(form.count),
        }),
      })

      const payload = (await response.json()) as RecommendationApiResponse

      if (!response.ok) {
        const serverError = typeof payload?.error === 'string' ? payload.error : 'Unable to load recommendations.'
        if (payload?.code === 'OUT_OF_SCOPE') {
          setMovies([])
          window.alert(serverError)
          return
        }
        throw new Error(serverError)
      }

      const recommendedMovies = payload?.data?.movies ?? []
      setMovies(recommendedMovies)

      if (recommendedMovies.length === 0) {
        setErrorMessage('No recommendations were returned for this request.')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong while fetching recommendations.'
      setErrorMessage(message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Movie Suggestor</p>
          <h1>Find your perfect movie</h1>
        </div>
      </div>

      <main className="layout">
        <section className="panel form-panel">
          <form onSubmit={handleSubmit} className="movie-form">
            <div className="field-group">
              <label htmlFor="userPrompt">What is your mood now?</label>
              <textarea
                id="userPrompt"
                name="userPrompt"
                value={form.userPrompt}
                onChange={(event) => handleInputChange('userPrompt', event.target.value)}
                placeholder="I want something cozy and thoughtful..."
                rows={4}
              />
            </div>

            <div className="field-grid">
              <div className="field-group">
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  value={form.genre}
                  onChange={(event) => handleInputChange('genre', event.target.value)}
                >
                  <option value="">Select a genre</option>
                  {genreOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="mood">Mood</label>
                <select
                  id="mood"
                  value={form.mood}
                  onChange={(event) => handleInputChange('mood', event.target.value)}
                >
                  {moodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="count">How many movies?</label>
              <select
                id="count"
                value={form.count}
                onChange={(event) => handleInputChange('count', Number(event.target.value))}
              >
                {countOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Loading...' : 'Get Recommendation'}
            </button>
          </form>
        </section>

        <section className="panel results-panel">
          <div className="results-header">
            <h2>Recommended movies</h2>
            <span>{summaryText}</span>
          </div>

          {errorMessage ? (
            <div className="notification error" role="alert">
              {errorMessage}
            </div>
          ) : null}

          {loading ? (
            <div className="loading-state" role="status" aria-live="polite">
              <span className="loading-spinner" aria-hidden="true" />
              <span>Finding movie recommendations...</span>
            </div>
          ) : null}

          {!loading && movies.length === 0 && !errorMessage ? (
            <div className="empty-state">
              Use the form to get movie recommendations based on your mood and genre.
            </div>
          ) : null}

          <div className="movie-grid">
            {movies.map((movie) => (
              <article key={`${movie.title}-${movie.year}`} className="movie-card">
                <div className="card-header">
                  <div>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                  </div>
                  <span className="rating-badge">★ {movie.rating.toFixed(1)}</span>
                </div>

                <div className="meta-block">
                  <strong>Genre:</strong>
                  <span>{movie.genre.join(', ')}</span>
                </div>

                <div className="meta-block">
                  <strong>Cast:</strong>
                  <span>{movie.cast.join(', ')}</span>
                </div>

                <div className="meta-block reason-block">
                  <strong>Why watch:</strong>
                  <p>{movie.reason}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

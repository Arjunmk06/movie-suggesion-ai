import z from 'zod'


export const movieSchema = z.object({
    title: z.string().describe("title of movie"),
    year: z.number().describe("Realease year"),
    genre: z.array(z.string().describe("List of genre")),
    cast: z.array(z.string().describe("top 3 cast in movie")),
    reason: z.string().describe("why this movie matches user's mood and preference"),
    rating: z.number().min(1).max(10).describe("IMDB stlye rating")
})

export const movieRecommendationsSchema  = z.object({
    movies: z.array(movieSchema).describe("list of movies matches user's mood and preference")
})


export type Movie = z.infer<typeof movieSchema>
export type Recommendation  = z.infer<typeof movieRecommendationsSchema>


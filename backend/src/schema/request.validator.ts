import z from 'zod'


export const requestBodySchema = z.object({
    userPrompt: z.string().trim().min(1,{message: "userprompt cannot empty"}).describe("userPrompt for search movies"),
    genre: z.string().trim().min(1, {message: "genre cannot empty"}).describe("genre of movies to list"),
    mood: z.string().trim().min(1,{message: "mood cannot be empty"}).describe("mood of movie should list"),
    count: z.number().min(2).max(5).describe("how many movies can sugges")
})
import { ChatGoogle } from "@langchain/google/node";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config'
import { movieRecommendationsSchema } from "../schema/movies.schema.js";
const model = new ChatGroq({
    model : "openai/gpt-oss-120b",
    temperature:0
})

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system",
        `You are movie recommendation expert.
        Return high-quality recommendations based on:
        -user's request
        -genre
        -mood
        -count

        Every movie shoud feel intentional
        Do not recommend only the most obivious titles every time.
        `
    ], [
        "human",
        `
        User request: {userPrompt}
        Preferences:
        - Genre: {genre}
        - Mood: {mood}
        - Number of movies: {count}
        `
    ]
]);


export async function getRecommendations(input:{
    userPrompt: string,
    genre: string,
    mood: string,
    count: number
}){
    // console.log(input)
    const chain = promptTemplate.pipe(model)

    const response = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count : input.count
    })

    console.log(response.text)

    return response.text
}

const sturcturedModel = model.withStructuredOutput(movieRecommendationsSchema)

export async function getRecommendationsStructured(input:{
    userPrompt: string,
    genre: string,
    mood: string,
    count: number
}){
    // console.log(input)
    const chain = promptTemplate.pipe(sturcturedModel)

    const response = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count : input.count
    })

    console.log(response)

    return response
}
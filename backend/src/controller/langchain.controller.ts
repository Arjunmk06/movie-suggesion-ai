import type { Request, Response } from "express";
import { getRecommendations, getRecommendationsStructured } from "../service/langchain.service.js";


export async function getRecommendationController(
    req:Request,
    res: Response
){

    try{

        const {
            userPrompt = "Suggest a movie for rainy night",
            genre = "thriller",
            mood = "count",
            count = 2
        } = req.body

        const result = await getRecommendationsStructured(
            {userPrompt, genre, mood, count}
        )

        return res.json({
            data: result
        })

    }catch(error){
        console.log("error", error)
        res.status(500).json({
            error: "somethind happened"
        })
    }
}
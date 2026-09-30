import type { Request, Response } from "express";
import { getRecommendationsStructured, isMovieRelated } from "../service/langchain.service.js";
import { requestBodySchema } from "../schema/request.validator.js";

const outOfScopeMessage = "I am movie suggestor assistant, can;t help wth other requirements";

export async function getRecommendationController(
    req:Request ,
    res: Response
){

    const validation = requestBodySchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
        error: "Validation failed",
        details: validation.error.issues,
        });
    }

    try{
        const isRelated = await isMovieRelated(validation.data.userPrompt);

        if (!isRelated) {
            return res.status(422).json({
                code: "OUT_OF_SCOPE",
                error: outOfScopeMessage,
            });
        }

        const result = await getRecommendationsStructured(validation.data);

    return res.status(200).json({
      data: result,
    });
    }catch(error){
        console.log("error", error)
        res.status(500).json({
            error: "somethind happened"
        })
    }
}
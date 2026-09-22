import type { Request, Response } from "express";
import { getRecommendations, getRecommendationsStructured } from "../service/langchain.service.js";
import { requestBodySchema } from "../schema/request.validator.js";

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
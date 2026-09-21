import { Router } from "express";
import { getRecommendationController } from "../controller/langchain.controller.js";


const router = Router()


router.post("/recommend", getRecommendationController)


export default router
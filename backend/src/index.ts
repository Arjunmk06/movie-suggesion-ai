import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import langchainRouter from './router/langchain.router.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get("/health", (_req, res)=>{
    res.json({status:"ok"})
})

app.use("/api/v1", langchainRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`)
})

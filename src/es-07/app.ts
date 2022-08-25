import express from 'express';
import 'express-async-errors';
import prisma from './lib/prisma/client'


const app = express();

app.get("/planets",async (req,res) =>{
    const planets = await prisma.planet.findMany()
    res.json(planets)
})

export default app
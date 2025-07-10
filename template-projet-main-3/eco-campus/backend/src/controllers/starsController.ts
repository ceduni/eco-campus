import { fetchAllStarsMetrics } from '../dataAccess/starsRepository';
import { Request, Response } from 'express';


export async function getAllStarsMetrics(req : Request, res : Response) {
  try {
    const rawData = await fetchAllStarsMetrics();          
    res.status(200).json(rawData);                   
  } catch (err) {
    res.status(500).json({ error: 'Erreur getGlobalScores' });
  }
}

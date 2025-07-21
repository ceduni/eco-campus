import { fetchAllStarsMetrics, fetchAllStarsFinalResults } from '../dataAccess/starsRepository';
import { Request, Response } from 'express';


export async function getAllStarsMetrics(req : Request, res : Response) {
  try {
    const rawData = await fetchAllStarsMetrics();          
    res.status(200).json(rawData);                   
  } catch (err) {
    res.status(500).json({ error: 'Erreur getGlobalScores' });
  }
}



export async function getFinalStarsScores(req : Request, res : Response) {
  try {
    const rawData = await fetchAllStarsFinalResults(); 
    console.log(rawData);              
    res.status(200).json(rawData);      
        
  } catch (err) {
    res.status(500).json({ error: 'Erreur getGlobalScores' });
  }
}
import { fetchAllRatios } from '../dataAccess/ratiosRepository';
import { Request, Response } from 'express';


export async function getAllRatios(req : Request, res : Response) {
  try {
    const rawData = await fetchAllRatios();          
    res.status(200).json(rawData);                   
  } catch (err) {
    res.status(500).json({ error: 'Erreur getGlobalScores' });
  }
}

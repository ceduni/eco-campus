import { fetchInstitutions } from '../dataAccess/institutionRepository';
import { Request, Response } from 'express';


export async function getInstitutions(req : Request, res : Response) {
  try {
    const rawData = await fetchInstitutions();          
    res.status(200).json(rawData);                   
  } catch (err) {
    res.status(500).json({ error: 'Erreur markers' });
  }
}

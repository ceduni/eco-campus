import { fetchAllMarkers } from '../dataAccess/markerRepository';
import { Request, Response } from 'express';


export async function getAllMarkers(req : Request, res : Response) {
  try {
    const rawData = await fetchAllMarkers();          
    res.status(200).json(rawData);                   
  } catch (err) {
    res.status(500).json({ error: 'Erreur markers' });
  }
}

import { calculateGlobalScoreById, calculateGlobalScores} from '../services/CalculationServices';
import {  getCompleteInstitutionData, getInstitDataById } from '../dataAccess/institutionRepository';
import { Alphas } from '../models/Alphas';
import { Request, Response } from 'express';

// fonction pour le score global
export async function getGlobalScores(req : Request, res : Response) {
  try {
    const rawData = await getCompleteInstitutionData();    // prendre les donnees de la table (req sql)
    const scores = calculateGlobalScores(rawData, req.body); // envoyer les donnees vers la fonction de calcul
    res.status(200).json(scores);                  // reponse au frontend format json (a formatter apres)
  } catch (err) {
    res.status(500).json({ error: 'Erreur getGlobalScores' });
  }
}

// fonction pour le score stars
 export async function getStarsScore(req : Request, res : Response) {
  try {
    const rawData = await getCompleteInstitutionData();               // prendre les donnees de la table (req sql)
     const starsScores = rawData.map(inst => ({
      id_institution: inst.getIdInstitution(),
      stars_values: inst.getStarsValues()
    }));

    res.status(200).json(starsScores);                  // reponse au frontend format json (a formatter apres)
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur log' });
  }
}


export async function getInstitutionDataById(req: Request, res: Response) {
  try {
    const { id_institution, alphas } = req.body;

    if (!id_institution || !alphas) {
      return res.status(400).json({ error: 'Missing institution id or alphas' });
    }

    const rawData = await getInstitDataById(id_institution);

    if (!rawData) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    const alphaObject = Alphas.createFromRaw(alphas); 
    const score = calculateGlobalScoreById(rawData, alphaObject); 

    return res.status(200).json({ id_institution, score });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur get data by institution id' });
  }
}

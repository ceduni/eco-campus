import { calculateGlobalScores} from '../services/CalculationServices';
import {  getCompleteInstitutionData } from '../dataAccess/institutionRepository';
import { Request, Response } from 'express';
import {Alphas} from '../models/Alphas';

// fonction pour le score global a ajuster en post ??? 
export async function getGlobalScores(req : Request, res : Response) {
  try {
    console.log('BODY', req.body)
    const rawData = await getCompleteInstitutionData();    // prendre les donnees de la table (req sql)    
    console.log(rawData);
    const alphas = Alphas.fromJSON(req.body);
    const scores = calculateGlobalScores(rawData, alphas); // envoyer les donnees vers la fonction de calcul       
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

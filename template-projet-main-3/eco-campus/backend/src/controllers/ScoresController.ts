import { calculateGlobalScores, calculateGlobalScoreById} from '../services/CalculationServices';
import { getAllReports, fetchAllStarsFinalResults } from '../dataAccess/reportRepository';
import { Request, Response } from 'express';
import {Alphas} from '../models/Alphas';
import { getInstitDataById } from '../dataAccess/institutionRepository';

// fonction pour le score global a ajuster en post ??? 
export async function getGlobalScores(req : Request, res : Response) {
  try { 
    console.log('BODY', req.body)
    const rawData = await getAllReports();    // prendre les donnees de la table (req sql)    
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
    const rawData = await getAllReports();               // prendre les donnees de la table (req sql)     
     const starsScores = rawData.map(inst => ({
      id_institution: inst.getIdInstitution(),
      stars_values: inst.getStarsValues()
    }));

    res.status(200).json(starsScores);                  // reponse au frontend format json (a formatter apres)    
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur log' });
  }
}

export async function getGlobalStarsScore(req : Request, res : Response) {
  try {
    const rawData = await fetchAllStarsFinalResults(); 
    console.log(rawData);              
    res.status(200).json(rawData);      
        
  } catch (err) {
    res.status(500).json({ error: 'Erreur getGlobalScores' });
  }
}

export async function getInstitutionDataById(req: Request, res: Response) {
  try {
    const { id_institution } = req.body;

    if (!id_institution) {
      return res.status(400).json({ error: 'id_institution est requis.' });
    }

    const rawData = await getInstitDataById(id_institution);
    if (!rawData) {
      return res.status(404).json({ error: 'Institution non trouvée.' });
    }

    const alphas = Alphas.fromJSON(req.body);
    const score = calculateGlobalScoreById(rawData.data, alphas);

   res.status(200).json({
   id_institution,
   institution_name: rawData.name,
   global_score: score,
   ratios_values: rawData.data.getRatiosValues(),
   stars_values: rawData.data.getStarsValues()
});
  } catch (err) {
    console.error('Erreur détaillée:', err instanceof Error ? err.message : err);
    res.status(500).json({ error: 'Erreur getInstitutionDataById' });
  }
}

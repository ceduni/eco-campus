import { calculateGlobalScores, calculateGlobalScoresPerso } from '../services/CalculationServices.js';
import { getInstitutionData } from '../dataAccess/institutionRepository.js';
import { getStars } from '../dataAccess/institutionRepository.js';
import { raw } from 'express';

// fonction pour le score global
export async function getGlobalScores(req, res) {
  try {
    const rawData = await getInstitutionData();    // prendre les donnees de la table (req sql)    
    const scores = calculateGlobalScores(rawData); // envoyer les donnees vers la fonction de calcul       
    res.status(200).json(scores);                  // reponse au frontend format json (a formatter apres)    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// fonction pour le score stars
export async function getStarsScore(req, res) {
  try {
    const rawData = await getStars();               // prendre les donnees de la table (req sql)     
    res.status(200).json(rawData);                  // reponse au frontend format json (a formatter apres)    
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur log' });
  }
}

// fonction pour le score global avec poid alpha personnalise 
export async function getGlobalScoresPerso(req, res) {
  try {
    console.log('Reçu: bpdy', req.body);
    const alphas = req.body.alphas || {}; 
    const rawData = await getInstitutionData();               // prendre les donnees de la table (req sql)  
    console.log('Reçu: data', rawData);
    const scores =  calculateGlobalScoresPerso(rawData, alphas); 
    console.log('scores', scores);
    res.status(200).json(scores);                  // reponse au frontend format json (a formatter apres)    
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur log' });
  }
}



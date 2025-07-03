import { institutionData } from '../models/institutionData';

export function calculateGlobalScores(data: institutionData[]) {
  const results: { id_institution: string; score: number }[] = [];

  for (let i = 0; i < data.length; i++) {
    const institution = data[i];
    const id = institution.id_institution;
    const ratios = institution.ratios_values;
    const values = Object.values(ratios); 
    
    let total = 0;
    for (let j = 0; j < values.length; j++) {
      total += values[j];
    }
    results.push({
      id_institution: id,
      score: total
    });
  }
  return results;
}


// fusionner les 2 fcts !!!!! 
// Reçu: { alphas: { '1': 2, '2': 1.5 } }
//Reçu: { '1': { '1': 15, '2': 40 }, '2': { '1': 20 } }
/* export function calculateGlobalScoresPerso(data, alphas = {}) {
  //const results = [];
  const results: { id_institution: string; score: number }[] = [];

  for (const idInstitution in data) {
    const ratios = data[idInstitution];
    let score = 0;

    for (const idRatio in ratios) {
      const value = ratios[idRatio];
      const alpha = alphas[idRatio] ?? 1;
      score += value * alpha;
    }

    results.push({
      id_institution: idInstitution,
      score: score
    });
  }

  return results;
} */



// { '1': { '1': 15 }, '2': { '1': 20 } }: format de institutionData 
// calculer le score global de toutes les unis et retourner la valeur pour chacune
export function calculateGlobalScores(data) {
  const results = [];
  for (const [id, ratios] of Object.entries(data)) {
    const total = Object.values(ratios).reduce((sum, value) => sum + value, 0);
    results.push({
      id_institution: id,
      score: total
    });
  }
  return results;
}

export function getGlobalScoresPerso(data, alphas = {}) {
}



//{ pour tester score globale avec alpha modifies
  //"alphas": {
  //  "1": 2,
  //  "2": 1.5
  //}
//}
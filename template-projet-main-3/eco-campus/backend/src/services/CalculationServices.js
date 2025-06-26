
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

// Reçu: { alphas: { '1': 2, '2': 1.5 } }
//Reçu: { '1': { '1': 15, '2': 40 }, '2': { '1': 20 } }
export function calculateGlobalScoresPerso(data, alphas = {}) {
  const results = [];

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
}


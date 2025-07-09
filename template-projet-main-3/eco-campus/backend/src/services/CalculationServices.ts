import { institutionData } from '../models/institutionData';
import { Alphas } from '../models/Alphas';

export function calculateGlobalScores(data: institutionData[], alphas: Alphas) {
  const results: { id_institution: string; score: number }[] = [];

  const coeffRatio = alphas.getCoeffRatio();
  const coeffOp = alphas.getCoeffOp();

  for (let i = 0; i < data.length; i++) {
    const institution = data[i];
    const id = institution.getIdInstitution();

    const ratios = institution.getRatiosValues();
    const ops = institution.getOpValues();

    let total = 0;

    for (const [ratioId, value] of Object.entries(ratios)) {
      const alpha = coeffRatio.get(ratioId) ?? 1; 
      total += value * alpha;
    }

    for (const [opId, value] of Object.entries(ops)) {
      const alpha = coeffOp.get(opId) ?? 1;
      total += value * alpha;
    }

    results.push({
      id_institution: id,
      score: total * 100
    });
  }

  return results;
}

export function calculateGlobalScoreById(
  institution: institutionData,
  alphas: Alphas
): number {
  const coeffRatio = alphas.getCoeffRatio();
  const coeffOp = alphas.getCoeffOp();

  const ratios = institution.getRatiosValues();
  const ops = institution.getOpValues();

  let total = 0;

  for (const [ratioId, value] of Object.entries(ratios)) {
    const alpha = coeffRatio.get(ratioId) ?? 1;
    total += value * alpha;
  }

  for (const [opId, value] of Object.entries(ops)) {
    const alpha = coeffOp.get(opId) ?? 1;
    total += value * alpha;
  }

  return total * 100;
}























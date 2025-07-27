
import { Scores } from '../models/Scores';
import { Alphas } from '../models/Alphas';

export function calculateGlobalScores(data: Scores[], alphas: Alphas) {
  type ValuesMap = { [key: string]: number };
  const results: { id_institution: string; score: number }[] = [];

  const coeffRatio = alphas.getCoeffRatio();
  const coeffOp = alphas.getCoeffOp();

  for (let i = 0; i < data.length; i++) {
    const institution = data[i];
    const id = institution.id_institution;

    const ratios: ValuesMap = institution.ratios_values;
    const ops: ValuesMap = institution.op_values;

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
      id_institution: id.toString(),
      score: Math.round(total * 10)
    });
  }

  return results;
}


export function calculateGlobalScoreById(
  score: Scores,
  alphas: Alphas
): number {
  const coeffRatio = alphas.getCoeffRatio();
  const coeffOp = alphas.getCoeffOp();

  const ratios = score.getRatiosValues();
  const ops = score.getOpValues();

  let total = 0;

  for (const [ratioId, value] of Object.entries(ratios)) {
    const alpha = coeffRatio.get(ratioId) ?? 1;
    total += value * alpha;
  }

  for (const [opId, value] of Object.entries(ops)) {
    const alpha = coeffOp.get(opId) ?? 1;
    total += value * alpha;
  }

  return total * 10;
}

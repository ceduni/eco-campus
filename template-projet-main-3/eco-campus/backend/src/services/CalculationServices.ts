import { institutionData } from '../models/institutionData';
import { Alphas } from '../models/Alphas';

export function calculateGlobalScores(data: institutionData[], alphas: Alphas) {
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

    console.log("COEFF RATIO :", coeffRatio);
    console.log("COEFF OP :", coeffOp);
    console.log("DATA institutions :", data); 
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
      score: total * 10
    });
  }

  return results;
}

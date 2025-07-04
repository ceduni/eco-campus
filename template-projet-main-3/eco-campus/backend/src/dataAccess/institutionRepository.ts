import supabase from '../supabaseClient';
import { institutionData } from '../models/institutionData';


export async function getCompleteInstitutionData(): Promise<institutionData[]> {
  // ratios
  const { data: ratioData, error: ratioError } = await supabase
    .from('ratio_values')
    .select('id_institution, id_ratio, value, year')
    .eq('year', 2025);

  if (ratioError) {
    throw new Error('Erreur lors de la récupération des ratios: ' + ratioError.message);
  }

  // stars 
  const { data: starsData, error: starsError } = await supabase
    .from('stars_values')
    .select('id_institution, id_metric, value, year, type')
    .eq('year', 2025);

  if (starsError) {
    throw new Error('Erreur lors de la récupération des étoiles: ' + starsError.message);
  }

  const institutionsMap = new Map<string, institutionData>();

  for (const { id_institution, id_ratio, value } of ratioData) {
    const institution =
      institutionsMap.get(id_institution) ??
      new institutionData(id_institution, {}, {}, {});

    institution.ratios_values[id_ratio] = parseFloat(value);
    institutionsMap.set(id_institution, institution);
  }

  for (const { id_institution, id_metric, value, type } of starsData) {
  const institution =
    institutionsMap.get(id_institution) ??
    new institutionData(id_institution, {}, {}, {});

  const parsedValue = parseFloat(value);
  institution.stars_values[id_metric] = parsedValue;

  if (type === 'op') {
    institution.op_values[id_metric] = parsedValue;
  }

  institutionsMap.set(id_institution, institution);
}
  return Array.from(institutionsMap.values());
}

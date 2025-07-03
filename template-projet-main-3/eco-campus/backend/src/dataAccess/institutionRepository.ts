import supabase from '../supabaseClient';
import { institutionData } from '../models/institutionData';

export async function getInstitutionData(): Promise<institutionData[]> {
  const { data, error } = await supabase
    .from('ratio_values')
    .select('id_institution, id_ratio, value, year')
    .eq('year', 2025);
  if (error) {
    throw new Error('Erreur lors de la récupération des données: ' + error.message);
  }
  const institutionsMap = new Map<string, institutionData>();

  for (const { id_institution, id_ratio, value } of data) {
    const institution = institutionsMap.get(id_institution) ?? new institutionData(id_institution, {});

    institution.ratios[id_ratio] = parseFloat(value);

    institutionsMap.set(id_institution, institution);
  }
  console.log('map des institutions', Array.from(institutionsMap.values()));
  return Array.from(institutionsMap.values());
}


export async function getStars() {
  const { data, error } = await supabase
    .from('stars_values')
    .select(`id_institution, id_metric, value,year`)
    .eq('year', 2025); 
  if (error) {
    throw new Error('Erreur lors de la récupération des données: ' + error.message);
  }
  const result: { [institutionId: string]: { [metricId: string]: number } } = {};
  data.forEach(entry => {
    const id_institution = entry.id_institution;
    const metricId = entry.id_metric;
    const value = entry.value;

    if (!result[id_institution]) {
      result[id_institution] = {};
    }
    result[id_institution][metricId] = value; 
  });
  console.log(result);
  return result; 
}

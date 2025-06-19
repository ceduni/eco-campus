import { supabase } from '../../supabaseClient.js';

export async function getInstitutionData() {
  const { data, error } = await supabase
    .from('ratio_values')
    .select(`
      value,
      year,
      institution (
        id_institution,
        name
      )
    `)
    .eq('year', 2025);

  if (error) {
    throw new Error('Erreur lors de la récupération des données: ' + error.message);
  }

  return data.map(entry => ({
    institutionId: entry.institution.id_institution,
    institutionName: entry.institution.name,
    year: entry.year,
    value: entry.value
  }));
}

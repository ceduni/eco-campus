import supabase from '../../supabaseClient.js';

export async function getInstitutionData() {  
  const { data, error } = await supabase
    .from('ratio_values')
    .select(`
      id_institution,
      id_ratio,
      value,
      year
    `)
    .eq('year', 2025); 
    
  if (error) {
    throw new Error('Erreur lors de la récupération des données: ' + error.message);
  }
  const result = {};
  data.forEach(entry => {
    const id_institution = entry.id_institution;
    const ratioId = entry.id_ratio;
    const value = entry.value;

    if (!result[id_institution]) {
      result[id_institution] = {};
    }
    result[id_institution][ratioId] = value;
  });
  return result; 
}

export async function getStars() {
  const { data, error } = await supabase
    .from('stars_values')
    .select(`
      id_institution,
      id_metric,
      value,
      year
    `)
    .eq('year', 2025); 
  if (error) {
    throw new Error('Erreur lors de la récupération des données: ' + error.message);
  }
  const result = {};
  data.forEach(entry => {
    const id_institution = entry.id_institution;
    const metricId = entry.id_metric;
    const value = entry.value;

    if (!result[id_institution]) {
      result[id_institution] = {};
    }
    result[id_institution][metricId] = value; 
  });
  return result; 
}

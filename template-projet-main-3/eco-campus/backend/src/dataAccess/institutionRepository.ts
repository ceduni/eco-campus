import supabase from '../supabaseClient';
import {institutionData } from '../models/institutionData';


export async function getCompleteInstitutionData(): Promise<institutionData[]> {
  // 1. Récupération des ratios
  const { data: ratioData, error: ratioError } = await supabase
    .from('ratio_values')
    .select('id_institution, id_ratio, value, year')
    .eq('year', 2025);

  if (ratioError) {
    throw new Error('Erreur lors de la récupération des ratios: ' + ratioError.message);
  }

  // 2. Récupération des scores stars
  const { data: starsData, error: starsError } = await supabase
    .from('stars_values')
    .select('id_institution, id_metric, value, year')
    .eq('year', 2025);

  if (starsError) {
    throw new Error('Erreur lors de la récupération des étoiles: ' + starsError.message);
  }

  // 3. Construction de la map d'institutions
  const institutionsMap = new Map<string, institutionData>();

  for (const { id_institution, id_ratio, value } of ratioData) {
    const institution =
      institutionsMap.get(id_institution) ??
      new institutionData(id_institution, {}, {}, {});

    institution.ratios_values[id_ratio] = parseFloat(value);
    institutionsMap.set(id_institution, institution);
  }

  for (const { id_institution, id_metric, value } of starsData) {
    const institution =
      institutionsMap.get(id_institution) ??
      new institutionData(id_institution, {}, {}, {});

    institution.stars_values[id_metric] = parseFloat(value);
    institutionsMap.set(id_institution, institution);
  }

  const result = Array.from(institutionsMap.values());
  return result;
}


export async function getInstitDataById(id_institution: string): Promise<{ data: institutionData, name: string } | null> {
  // 1. Récupération des ratios
  const { data: ratioData, error: ratioError } = await supabase
    .from('ratio_values')
    .select('id_ratio, value, year')
    .eq('id_institution', id_institution)
    .eq('year', 2025);

  if (ratioError) {
    throw new Error('Erreur lors de la récupération des ratios: ' + ratioError.message);
  }

  // 2. Récupération des scores stars
  const { data: starsData, error: starsError } = await supabase
    .from('stars_values')
    .select('id_metric, value, year')
    .eq('id_institution', id_institution)
    .eq('year', 2025);

  if (starsError) {
    throw new Error('Erreur lors de la récupération des étoiles: ' + starsError.message);
  }

  // 3. Récupération du nom de l’institution
  const { data: nameData, error: nameError } = await supabase
    .from('institution')
    .select('name')
    .eq('id_institution', id_institution)
    .single();

  if (nameError) {
    throw new Error('Erreur lors de la récupération du nom de l’institution: ' + nameError.message);
  }

  
  const ratios: Record<string, number> = {};
  for (const { id_ratio, value } of ratioData) {
    ratios[id_ratio] = parseFloat(value);
  }

  const stars: Record<string, number> = {};
  for (const { id_metric, value } of starsData) {
    stars[id_metric] = parseFloat(value);
  }

 
  if (Object.keys(ratios).length === 0 && Object.keys(stars).length === 0) {
    return null;
  }

  
  const institution = new institutionData(id_institution, ratios, stars, {});

  return {
    data: institution,
    name: nameData?.name ?? 'Université'
  };
}

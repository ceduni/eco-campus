import supabase from '../supabaseClient';
import {InstitutionData} from '../models/institutionData';


export async function fetchInstitutions(): Promise<InstitutionData[]> {
  console.log("hi asma");
  const { data, error } = await supabase
    .from('institution')
    .select('*');

  if (error) {
    throw new Error("Erreur lors de la récupération des ratios : " + error.message);
  }

  if (!data) return [];

  const institutionList: InstitutionData[] = data.map((row) => {
    return new InstitutionData(
      row.id_institution.toString(),
      row.name,
      row.lat,
      row.lng,
      row.type,
      row.logo
    );

  });
 
  return institutionList;
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

  // 4. Initialisation des objets de valeurs
  const ratios: Record<string, number> = {};
  for (const { id_ratio, value } of ratioData) {
    ratios[id_ratio] = parseFloat(value);
  }

  const stars: Record<string, number> = {};
  for (const { id_metric, value } of starsData) {
    stars[id_metric] = parseFloat(value);
  }

  // 5. Si aucune donnée, retourne null
  if (Object.keys(ratios).length === 0 && Object.keys(stars).length === 0) {
    return null;
  }

  // 6. Création de l'objet institutionData
  const institution = new institutionData(id_institution, ratios, stars, {});

  return {
    data: institution,
    name: nameData?.name ?? 'Université'
  };
}

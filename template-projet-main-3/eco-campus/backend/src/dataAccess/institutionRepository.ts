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

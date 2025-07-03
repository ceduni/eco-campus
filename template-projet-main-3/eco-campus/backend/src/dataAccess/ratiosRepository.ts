import supabase from '../supabaseClient';

// Va chercher dynamiquement tous les id_ratio de la table ratios
export async function fetchAllRatioIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from('ratios')
    .select('id_ratio');

  if (error) {
    throw new Error("Erreur lors de la récupération des ratios : " + error.message);
  }

  return data.map((row) => row.id_ratio);
}

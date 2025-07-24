import supabase from '../supabaseClient';
import {Stars} from '../models/Stars';


export async function fetchAllStarsMetrics(): Promise<Stars[]> {
  const { data, error } = await supabase
    .from('metric_stars')
    .select('*');

  if (error) {
    throw new Error("Erreur lors de la récupération des ratios : " + error.message);
  }

  if (!data) return [];

  const starsList: Stars[] = data.map((row) => {
    return new Stars(
      row.id_metric.toString(),
      row.name,
      row.id_parent,
      row.description ?? "",
      row.category,
      row.denominateur
    );
  });

  return starsList;
}


export async function fetchAllStarsFinalResults(): Promise<any[]> {
  const { data, error } = await supabase
    .from('stars_final_results')
    .select('id_institution, score, rating');

  if (error) {
    throw new Error("Erreur lors de la récupération des scores: " + error.message);
  }

  if (!data) return [];

  return data.map((row) => ({
    id_institution: row.id_institution.toString(),
    score: row.score,
    rating: row.rating
  }));
}

import supabase from '../supabaseClient';
import {Ratios} from '../models/Ratios';


export async function fetchAllRatios(): Promise<Ratios[]> {
  const { data, error } = await supabase
    .from('ratios')
    .select('id_ratio, name, metric1, metric2, description');

  if (error) {
    throw new Error("Erreur lors de la récupération des ratios : " + error.message);
  }

  if (!data) return [];

  const ratiosList: Ratios[] = data.map((row) => {
    return new Ratios(
      row.id_ratio.toString(),
      row.name,
      row.metric1,
      row.metric2,
      row.description ?? ""
    );
  });

  return ratiosList;
}

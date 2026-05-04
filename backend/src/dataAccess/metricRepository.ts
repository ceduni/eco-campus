import supabase from '../supabaseClient';
import {Ratios} from '../models/Ratios';
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

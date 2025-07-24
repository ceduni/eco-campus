import supabase from '../supabaseClient';
import {MarkerData} from '../models/MarkerData';


export async function fetchAllMarkers(): Promise<MarkerData[]> {
  console.log("hi asma");
  const { data, error } = await supabase
    .from('institution')
    .select('*');

  if (error) {
    throw new Error("Erreur lors de la récupération des ratios : " + error.message);
  }

  if (!data) return [];

  const markerList: MarkerData[] = data.map((row) => {
    return new MarkerData(
      row.id_institution.toString(),
      row.name,
      row.lat,
      row.lng,
      row.type,
      row.logo
    );

  });
 
  return markerList;
}

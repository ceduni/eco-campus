import { getAllReports } from '../dataAccess/reportRepository';
import supabase from '../supabaseClient';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    const institutions = await getAllReports();
    console.log("Résultat final :", institutions);
  } catch (err) {
    console.error("Erreur pendant le test :", err);
  }
})();

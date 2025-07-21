import { getCompleteInstitutionData } from '../dataAccess/institutionRepository';
import supabase from '../supabaseClient';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    const institutions = await getCompleteInstitutionData();
    console.log("Résultat final :", institutions);
  } catch (err) {
    console.error("Erreur pendant le test :", err);
  }
})();

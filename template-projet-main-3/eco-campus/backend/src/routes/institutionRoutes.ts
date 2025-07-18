import express from 'express';
//import { getGlobalScores, getStarsScore, getGlobalScoresPerso } from '../controllers/institutionController';
import { getGlobalScores, getStarsScore} from '../controllers/institutionController';
import { getInstitutionDataById} from '../controllers/institutionController';
import supabase from '../supabaseClient';


const router = express.Router();

// quand lapi nous a envoye de server.js a ce file, ce qui est ecrit dans l'url, est trouve ici et le chemin suit:

// route pour obtenir les scores de toutes les uni
router.post('/scores', getGlobalScores);

// route pour obtenir score stars
router.get('/stars', getStarsScore);




//route pour obtenir le score de l'uni par id (une seule uni)
router.post('/scoresById', getInstitutionDataById); //could alose be get, don't know why i have a bug 
export default router;

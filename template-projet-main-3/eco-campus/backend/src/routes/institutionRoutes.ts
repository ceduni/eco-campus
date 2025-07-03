import express from 'express';
//import { getGlobalScores, getStarsScore, getGlobalScoresPerso } from '../controllers/institutionController';
import { getGlobalScores, getStarsScore} from '../controllers/institutionController';
import supabase from '../supabaseClient';


const router = express.Router();

// quand lapi nous a envoye de server.js a ce file, ce qui est ecrit dans l'url, est trouve ici et le chemin suit:

// route pour obtenir les scores de toutes les uni (test)
router.get('/scores', getGlobalScores);

// route pour obtenir score stars
router.get('/stars', getStarsScore);

//router.post('/scorespersonnalise', getGlobalScoresPerso);

export default router;

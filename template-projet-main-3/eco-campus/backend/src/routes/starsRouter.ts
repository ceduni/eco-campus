import express from 'express';
import supabase from '../supabaseClient';
import { getAllStarsMetrics, getFinalStarsScores} from '../controllers/starsController';
const router = express.Router();


// route pour obtenir tous les ratios 
router.get('/', getAllStarsMetrics);

router.get('/finalscores', getFinalStarsScores);



export default router;

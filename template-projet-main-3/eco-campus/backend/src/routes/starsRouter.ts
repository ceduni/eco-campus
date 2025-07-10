import express from 'express';
import supabase from '../supabaseClient';
import { getAllStarsMetrics} from '../controllers/starsController';
const router = express.Router();


// route pour obtenir tous les ratios 
router.get('/', getAllStarsMetrics);



export default router;

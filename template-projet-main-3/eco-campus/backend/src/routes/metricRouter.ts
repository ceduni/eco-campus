import express from 'express';
import supabase from '../supabaseClient';
import { getAllRatios} from '../controllers/metricController';
import { getAllStarsMetrics} from '../controllers/metricController';
const router = express.Router();


// route pour obtenir tous les metric stars 
router.get('/stars', getAllStarsMetrics);


router.get('/ratios', getAllRatios);

export default router;

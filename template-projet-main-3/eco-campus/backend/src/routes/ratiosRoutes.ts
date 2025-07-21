import express from 'express';
import supabase from '../supabaseClient';
import { getAllRatios} from '../controllers/ratiosController';
const router = express.Router();


// route pour obtenir tous les ratios 
router.get('/', getAllRatios);



export default router;

import express from 'express';
import supabase from '../supabaseClient';
import { getAllMarkers} from '../controllers/markerController';
const router = express.Router();


// route pour obtenir tous les markers 
router.get('/', getAllMarkers);


export default router;

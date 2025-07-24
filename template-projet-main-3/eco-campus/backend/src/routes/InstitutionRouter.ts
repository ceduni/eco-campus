import express from 'express';
import supabase from '../supabaseClient';
import { getInstitutions} from '../controllers/institutionController';
const router = express.Router();


// route pour obtenir tous les institutions 
router.get('/', getInstitutions);


export default router;

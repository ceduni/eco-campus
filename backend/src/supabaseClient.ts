import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_KEY!
);


export default supabase;

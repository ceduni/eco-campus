import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!, // ← ! dit "je garantis que ce n'est pas undefined"
  process.env.SUPABASE_KEY!
);


export default supabase;

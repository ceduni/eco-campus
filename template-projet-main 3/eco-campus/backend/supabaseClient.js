// Connexion Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Fonction de test
async function testSupabaseConnection() {
  const { data, error } = await supabase.from('building').select('*');

  if (error) {
    console.error(' Erreur de connexion à Supabase :', error.message);
  } else {
    console.log('Connexion réussie à Supabase !');
    console.log('Données retournées :', data);
  }
}

testSupabaseConnection();

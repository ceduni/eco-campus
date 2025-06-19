import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // a voir pour la securite 
import institutionRoutes from './src/routes/institutionRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

// Routes 
// Route pour que l'api se branche a insitutionRoutes.. voir la suite dans insitutionRoute
app.use('/', institutionRoutes);


// Lancer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend actif sur http://localhost:${PORT}`);
});
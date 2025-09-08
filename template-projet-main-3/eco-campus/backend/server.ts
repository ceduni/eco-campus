import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // a voir pour la securite 
import ScoresRouter from './src/routes/ScoresRouter';
import metricRouter from './src/routes/metricRouter';
import InstitutionRouter from './src/routes/InstitutionRouter'


const app = express();
app.use(cors());
app.use(express.json());

// Routes 
// Route pour que l'api se branche a insitutionRoutes.. voir la suite dans insitutionRoute
app.use('/scores', ScoresRouter);

app.use('/metrics', metricRouter);

app.use('/institutions', InstitutionRouter);

// Lancer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend actif sur http://localhost:${PORT}`);
});
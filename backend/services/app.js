import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import CriarRotas from "./rotas.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

CriarRotas(app);




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));

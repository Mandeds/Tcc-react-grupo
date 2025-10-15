import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000; // Valor padrão caso PORT não exista

app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
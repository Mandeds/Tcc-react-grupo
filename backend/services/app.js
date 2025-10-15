import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import CriarRotas from "./rotas.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

CriarRotas(app);

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Servidor rodando',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'API funcionando!',
        version: '1.0.0'
    });
});

app.use((req, res) => {
    res.status(404).json({ 
        error: 'Rota não encontrada',
        path: req.originalUrl
    });
});

app.use((error, req, res, next) => {
    console.error('Erro no servidor:', error);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});

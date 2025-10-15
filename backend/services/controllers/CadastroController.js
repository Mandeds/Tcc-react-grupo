import * as repo from '../Repository/CadastroRepository.js'
import { Router } from 'express';

const endpoints = Router();


endpoints.post('/cadastro', async (req, res) => {
    const dados = req.body;

    const info = await repo.CriarUsuario(dados);
    res.send({ NovoId: info })
})



export default endpoints
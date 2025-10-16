import * as repo from '../Repository/UsuarioRepository.js'
import { Router } from 'express';
import {generateUserToken} from '../utils/jwt.js'


const endpoints = Router();


endpoints.post('/cadastro', async (req, res) => {
    const dados = req.body;

    const info = await repo.CriarUsuario(dados)
    const token = generateUserToken(info);

    res.send({ token: token })
})



export default endpoints
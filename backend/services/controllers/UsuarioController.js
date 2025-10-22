import * as repo from '../Repository/UsuarioRepository.js'
import { Router } from 'express';
import {generateUserToken} from '../utils/jwt.js'


const endpoints = Router();


endpoints.post('/cadastro', async (req, res) => {
    const dados = req.body;

    const novoId = await repo.CriarUsuario(dados);
    res.send({NovoId: novoId});

   
});

endpoints.post('/login', async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    

    const info = await repo.loginUsuario(email, senha);
    const token = generateUserToken(info);
    res.send({ token: token });
});



export default endpoints
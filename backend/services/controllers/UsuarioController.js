import * as repo from '../Repository/UsuarioRepository.js'
import { Router } from 'express';
import {generateUserToken, generateAdminToken} from '../utils/jwt.js'


const endpoints = Router();


endpoints.post('/cadastro', async (req, res) => {
    const dados = req.body;

    const info = await repo.CriarUsuario(dados)
    const token = generateUserToken(info);

    res.send({ NovoId: info, token: token })
})

endpoints.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Tentar login como usuário normal
    let usuario = await repo.LoginUsuario(email, senha);

    if (usuario) {
        const token = generateUserToken(usuario);
        res.send({ token: token });
    } else {
        // Se não encontrou como usuário, tentar como admin
        const admin = await repo.LoginAdmin(email, senha);
        if (admin) {
            const token = generateAdminToken(admin);
            res.send({ token: token });
        } else {
            res.status(401).send({ error: 'Email ou senha inválidos' });
        }
    }
})



export default endpoints

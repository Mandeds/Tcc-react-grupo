import * as repo from '../Repository/UsuarioRepository.js'
import { Router } from 'express';
import {generateUserToken} from '../utils/jwt.js'


const endpoints = Router();


endpoints.post('/cadastro', async (req, res) => {
    try {
        const dados = req.body;

        const usuario = {
            nm_usuario: dados.nm_usuario,
            email: dados.email,
            senha: dados.senha,
            biografia: dados.biografia || '',
            telefone: dados.telefone || null,
            cidade: dados.cidade || '',
            ehOng: dados.ehOng || false,
            foto_perfil: dados.foto_perfil || '',
            dt_criacao: new Date()
        };

        const novoId = await repo.CriarUsuario(usuario);
        const token = generateUserToken(novoId);

        res.send({ token });
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).send({ message: "Erro ao cadastrar usuário" });
    }
});


endpoints.post('/login', async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    

    const info = await repo.loginUsuario(email, senha);
    const token = generateUserToken(info);
    res.send({ token: token });
});



export default endpoints
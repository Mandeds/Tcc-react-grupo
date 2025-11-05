import * as repo from '../Repository/UsuarioRepository.js'
import { Router } from 'express';
import {generateUserToken} from '../utils/jwt.js'


const endpoints = Router();


endpoints.post('/cadastro', async (req, res) => {
    try {
        const dados = req.body;
        
        console.log("Dados recebidos no cadastro:", dados);

        // Validação básica
        if (!dados.nm_usuario || !dados.email || !dados.senha) {
            return res.status(400).send({ 
                message: "Nome, email e senha são obrigatórios" 
            });
        }

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

        console.log("Usuário a ser criado:", usuario);

        const novoId = await repo.CriarUsuario(usuario);
        const token = generateUserToken(novoId);

        res.send({ token });
        
    } catch (err) {
        console.error("Erro ao cadastrar usuário:", err);
        res.status(500).send({ 
            message: "Erro ao cadastrar usuário: " + err.message 
        });
    }
});


endpoints.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const senha = req.body.senha;
        
        const info = await repo.loginUsuario(email, senha);
        
        // Verifica se encontrou algum usuário
        if (info.length === 0) {
            return res.status(401).send({ 
                message: "Email ou senha inválidos" 
            });
        }

        // Pega o primeiro usuário do array (deve ser único)
        const usuario = info[0];
        
        // Gera o token passando apenas o ID do usuário
        const token = generateUserToken(usuario.id_usuario);
        
        res.send({ 
            token: token,
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nm_usuario,
                email: usuario.email,
                biografia: usuario.biografia,
                cidade: usuario.cidade,
                ehOng: usuario.ehOng,
                foto_perfil: usuario.foto_perfil
            }
        });

    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).send({ 
            message: "Erro interno do servidor" 
        });
    }
});


export default endpoints;
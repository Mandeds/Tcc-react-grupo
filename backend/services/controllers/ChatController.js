import connection from '../Repository/connection.js';
import { Router } from 'express';
import { requireUser } from '../utils/jwt.js';

const endpoints = Router();

// Middleware para proteger rotas de chat
endpoints.use(requireUser());

// Buscar mensagens do chat público
endpoints.get('/publico', async (req, res) => {
    try {
        const comando = `
            SELECT cp.id_chat_publico, cp.mensagem, cp.dt_criacao,
                   u.nm_usuario, u.foto_perfil
            FROM chat_publico cp
            JOIN usuario u ON cp.id_criador = u.id_usuario
            ORDER BY cp.dt_criacao DESC
            LIMIT 50
        `;

        const [mensagens] = await connection.query(comando);
        res.json(mensagens.reverse()); // Inverter para ordem cronológica
    } catch (error) {
        console.error('Erro ao buscar mensagens públicas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Enviar mensagem no chat público
endpoints.post('/publico', async (req, res) => {
    const { mensagem } = req.body;
    const idUsuario = req.user.id_usuario || req.user.id_admin;

    if (!mensagem || mensagem.trim().length === 0) {
        return res.status(400).json({ error: 'Mensagem não pode estar vazia' });
    }

    try {
        const comando = `
            INSERT INTO chat_publico (mensagem, id_criador, dt_criacao)
            VALUES (?, ?, NOW())
        `;

        const [result] = await connection.query(comando, [mensagem.trim(), idUsuario]);
        res.json({ id: result.insertId, message: 'Mensagem enviada' });
    } catch (error) {
        console.error('Erro ao enviar mensagem pública:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Buscar mensagens do chat privado (conversas do usuário)
endpoints.get('/privado', async (req, res) => {
    const idUsuario = req.user.id_usuario || req.user.id_admin;

    try {
        const comando = `
            SELECT id_chat_privado, mensagem, dt_criacao
            FROM chat_privado
            WHERE id_usuario = ?
            ORDER BY dt_criacao DESC
            LIMIT 50
        `;

        const [mensagens] = await connection.query(comando, [idUsuario]);
        res.json(mensagens.reverse()); // Inverter para ordem cronológica
    } catch (error) {
        console.error('Erro ao buscar mensagens privadas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Enviar mensagem no chat privado
endpoints.post('/privado', async (req, res) => {
    const { mensagem } = req.body;
    const idUsuario = req.user.id_usuario || req.user.id_admin;

    if (!mensagem || mensagem.trim().length === 0) {
        return res.status(400).json({ error: 'Mensagem não pode estar vazia' });
    }

    try {
        const comando = `
            INSERT INTO chat_privado (mensagem, id_usuario, dt_criacao)
            VALUES (?, ?, NOW())
        `;

        const [result] = await connection.query(comando, [mensagem.trim(), idUsuario]);
        res.json({ id: result.insertId, message: 'Mensagem privada enviada' });
    } catch (error) {
        console.error('Erro ao enviar mensagem privada:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar usuários com quem o usuário conversou
endpoints.get('/conversas', async (req, res) => {
    const idUsuario = req.user.id_usuario || req.user.id_admin;

    try {
        // Como não há tabela específica para conversas, vamos buscar usuários que têm mensagens privadas
        // Isso é uma simplificação - em produção, seria melhor ter uma tabela de conversas
        const comando = `
            SELECT DISTINCT u.id_usuario, u.nm_usuario, u.foto_perfil, u.cidade
            FROM usuario u
            JOIN chat_privado cp ON u.id_usuario = cp.id_usuario
            WHERE cp.id_usuario != ?
            ORDER BY u.nm_usuario
        `;

        const [usuarios] = await connection.query(comando, [idUsuario]);
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar conversas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default endpoints;

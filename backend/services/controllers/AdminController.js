import * as repo from '../Repository/UsuarioRepository.js'
import { Router } from 'express';
import { requireAdmin } from '../utils/jwt.js'

const endpoints = Router();

// Middleware para proteger todas as rotas admin
endpoints.use(requireAdmin());

// Listar todos os usuários
endpoints.get('/usuarios', async (req, res) => {
    try {
        const comando = `
            SELECT id_usuario, nm_usuario, email, biografia, telefone, cidade, ehOng, foto_perfil, dt_criacao, banido
            FROM usuario
            ORDER BY dt_criacao DESC
        `;

        const [usuarios] = await repo.connection.query(comando);
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Banir/desbanir usuário
endpoints.put('/usuarios/:id/banir', async (req, res) => {
    const { id } = req.params;
    const { banido } = req.body;

    try {
        const comando = `
            UPDATE usuario
            SET banido = ?
            WHERE id_usuario = ?
        `;

        await repo.connection.query(comando, [banido, id]);
        res.json({ message: `Usuário ${banido ? 'banido' : 'desbanido'} com sucesso` });
    } catch (error) {
        console.error('Erro ao banir/desbanir usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar usuário
endpoints.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comando = `DELETE FROM usuario WHERE id_usuario = ?`;
        await repo.connection.query(comando, [id]);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Buscar sugestões dos usuários
endpoints.get('/sugestoes', async (req, res) => {
    try {
        const comando = `
            SELECT sa.id_sugestao, sa.mensagem, sa.dt_criacao,
                   u.nm_usuario, u.email, u.foto_perfil
            FROM sugestoes_admin sa
            JOIN usuario u ON sa.id_usuario = u.id_usuario
            ORDER BY sa.dt_criacao DESC
        `;

        const [sugestoes] = await repo.connection.query(comando);
        res.json(sugestoes);
    } catch (error) {
        console.error('Erro ao buscar sugestões:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar sugestão
endpoints.delete('/sugestoes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comando = `DELETE FROM sugestoes_admin WHERE id_sugestao = ?`;
        await repo.connection.query(comando, [id]);
        res.json({ message: 'Sugestão deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar sugestão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default endpoints;

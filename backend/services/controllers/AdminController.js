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

export default endpoints;

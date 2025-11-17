import connection from '../Repository/connection.js';
import { Router } from 'express';
import { requireUser } from '../utils/jwt.js';
import multer from 'multer';
import path from 'path';

const endpoints = Router();

// Configuração do multer para upload de fotos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limite
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas imagens são permitidas!'));
        }
    }
});

// Middleware para proteger rotas de post
endpoints.use(requireUser());

// Criar post com upload de foto
endpoints.post('/criar', upload.single('foto'), async (req, res) => {
    const { titulo, descricao, tipo_post, urgencia, id_pet } = req.body;
    const idUsuario = req.user.id_usuario || req.user.id_admin;
    const fotoPath = req.file ? req.file.filename : null;

    try {
        const comando = `
            INSERT INTO post (id_usuario, id_pet, tipo_post, titulo, descricao, fotos, urgencia, dt_postagem)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        const [result] = await connection.query(comando, [
            idUsuario,
            id_pet || null,
            tipo_post,
            titulo,
            descricao,
            fotoPath,
            urgencia === 'true' || urgencia === true ? 1 : 0
        ]);

        res.json({
            id: result.insertId,
            message: 'Post criado com sucesso',
            foto: fotoPath
        });
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar posts
endpoints.get('/listar', async (req, res) => {
    const { tipo, pagina = 1, limite = 10 } = req.query;
    const offset = (pagina - 1) * limite;

    try {
        let comando = `
            SELECT p.id_post, p.titulo, p.descricao, p.fotos, p.urgencia, p.dt_postagem, p.tipo_post,
                   u.nm_usuario, u.foto_perfil,
                   pet.nm_pet, pet.especie, pet.raca
            FROM post p
            JOIN usuario u ON p.id_usuario = u.id_usuario
            LEFT JOIN pet ON p.id_pet = pet.id_pet
            WHERE u.banido = false
        `;

        const params = [];

        if (tipo) {
            comando += ' AND p.tipo_post = ?';
            params.push(tipo);
        }

        comando += ' ORDER BY p.dt_postagem DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limite), offset);

        const [posts] = await connection.query(comando, params);
        res.json(posts);
    } catch (error) {
        console.error('Erro ao listar posts:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Buscar post por ID
endpoints.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const comando = `
            SELECT p.*, usuario.banido, usuario.nm_usuario, usuario.foto_perfil, pet.nm_pet, pet.especie, pet.raca
            FROM post
            INNER JOIN usuario ON post.id_usuario = usuario.id_usuario
            WHERE post.id_post = ? AND usuario.banido = false
        `;

        const [posts] = await connection.query(comando, [id]);

        if (posts.length === 0) {
            return res.status(404).json({ error: 'Post não encontrado' });
        }

        res.json(posts[0]);
    } catch (error) {
        console.error('Erro ao buscar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Deletar post (apenas do próprio usuário)
endpoints.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const idUsuario = req.user.id_usuario || req.user.id_admin;

    try {
        const comando = 'DELETE FROM post WHERE id_post = ? AND id_usuario = ?';
        const [result] = await connection.query(comando, [id, idUsuario]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post não encontrado ou não autorizado' });
        }

        res.json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar post:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Listar pets de usuários específicos (para navegação)
endpoints.get('/pets/usuarios', async (req, res) => {
    const { usuarios } = req.query; // IDs separados por vírgula

    if (!usuarios) {
        return res.status(400).json({ error: 'IDs de usuários são necessários' });
    }

    const ids = usuarios.split(',').map(id => parseInt(id));

    try {
        const placeholders = ids.map(() => '?').join(',');
        const comando = `
            SELECT p.*, u.nm_usuario, u.foto_perfil as foto_usuario, u.cidade
            FROM pet p
            JOIN usuario u ON p.id_usuario = u.id_usuario
            WHERE p.id_usuario IN (${placeholders})
            ORDER BY p.id_pet DESC
            LIMIT 20
        `;

        const [pets] = await connection.query(comando, ids);
        res.json(pets);
    } catch (error) {
        console.error('Erro ao buscar pets:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Recomendações (posts recentes para adoção)
endpoints.get('/recomendacoes', async (req, res) => {
    try {
        const comando = `
            SELECT p.id_post, p.titulo, p.descricao, p.fotos, p.urgencia, p.dt_postagem,
                   u.nm_usuario, u.foto_perfil,
                   pet.nm_pet, pet.especie, pet.raca, pet.idade, pet.porte
            FROM post p
            JOIN usuario u ON p.id_usuario = u.id_usuario
            LEFT JOIN pet ON p.id_pet = pet.id_pet
            WHERE p.tipo_post = 'adocao' AND u.banido = false
            ORDER BY p.dt_postagem DESC
            LIMIT 10
        `;

        const [posts] = await connection.query(comando);
        res.json(posts);
    } catch (error) {
        console.error('Errro ao buscar recomendações:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default endpoints;

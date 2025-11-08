import * as repo from '../Repository/UsuarioRepository.js'
import { Router } from 'express';
import {generateUserToken, generateAdminToken} from '../utils/jwt.js'
import nodemailer from 'nodemailer';
import crypto from 'crypto';


const endpoints = Router();

// Configuração do nodemailer (usando Gmail como exemplo)
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

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

// Endpoint para solicitar redefinição de senha
endpoints.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await repo.getUserByEmail(email);
    if (!usuario) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    // Gerar token seguro
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora

    // Salvar token no banco
    await repo.createResetToken(email, token, expiresAt);

    // Enviar email
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Redefinição de Senha - Amigos de Patas',
      html: `
        <h2>Redefinição de Senha</h2>
        <p>Olá ${usuario.nm_usuario},</p>
        <p>Você solicitou a redefinição de sua senha. Clique no link abaixo para criar uma nova senha:</p>
        <a href="${resetLink}" style="background-color: #A36217; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
        <p>Este link expira em 1 hora.</p>
        <p>Se você não solicitou esta redefinição, ignore este email.</p>
        <br>
        <p>Atenciosamente,<br>Equipe Amigos de Patas</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.send({ message: 'Email de redefinição enviado com sucesso' });

  } catch (error) {
    console.error('Erro ao enviar email de redefinição:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
});

// Endpoint para redefinir senha
endpoints.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verificar token
    const tokenData = await repo.getResetToken(token);
    if (!tokenData) {
      return res.status(400).send({ error: 'Token inválido ou expirado' });
    }

    // Atualizar senha
    await repo.updatePassword(tokenData.email, newPassword);

    // Remover token usado
    await repo.deleteResetToken(token);

    res.send({ message: 'Senha redefinida com sucesso' });

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
});

export default endpoints

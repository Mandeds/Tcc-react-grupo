import { Router } from 'express';
import * as ChatRepository from "../Repository/ChatRepository.js";

const router = Router();

export async function listarContatos(req, res) {
  try {
    const { idUsuario } = req.params;
    const contatos = await ChatRepository.listarContatos(idUsuario);
    res.send(contatos);
  } catch (err) {
    res.status(500).send({ erro: "Erro ao listar contatos", detalhes: err.message });
  }
}

export async function listarMensagens(req, res) {
  try {
    const { idUsuario, idDestinatario } = req.params;
    const mensagens = await ChatRepository.listarMensagens(idUsuario, idDestinatario);
    res.send(mensagens);
  } catch (err) {
    res.status(500).send({ erro: "Erro ao listar mensagens", detalhes: err.message });
  }
}

export async function enviarMensagem(req, res) {
  try {
    const { id_remetente, id_destinatario, mensagem } = req.body;
    if (!id_remetente || !id_destinatario || !mensagem) {
      return res.status(400).send({ erro: "Campos obrigatórios ausentes." });
    }

    const id = await ChatRepository.enviarMensagem(
      id_remetente,
      id_destinatario,
      mensagem
    );

    res.send({
      id_mensagem: id,
      mensagem,
      sucesso: true,
    });
  } catch (err) {
    res.status(500).send({ erro: "Erro ao enviar mensagem", detalhes: err.message });
  }
}

router.get('/contatos/:idUsuario', listarContatos);
router.get('/mensagens/:idUsuario/:idDestinatario', listarMensagens);
router.post('/mensagem', enviarMensagem);

export default router;
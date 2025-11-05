import connection from "./connection.js";

export async function enviarMensagemPublica(novaMensagem) {
  const comando = `
    INSERT INTO chat_publico (mensagem, id_criador, dt_criacao)
    VALUES (?, ?, NOW())
  `;

  const [info] = await connection.query(comando, [
    novaMensagem.mensagem,
    novaMensagem.id_criador
  ]);

  return info.insertId;
}

export async function listarMensagensPublicas() {
  const comando = `
    SELECT c.id_chat_publico, c.mensagem, c.dt_criacao,
           u.nm_usuario, u.foto_perfil
      FROM chat_publico c
      JOIN usuario u ON u.id_usuario = c.id_criador
     ORDER BY c.dt_criacao DESC
     LIMIT 50
  `;

  const [linhas] = await connection.query(comando);
  return linhas;
}


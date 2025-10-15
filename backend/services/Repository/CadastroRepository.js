import { conection } from "./conection.js";


let hoje = new Date();

export async function CriarUsuario(novoLogin) {
    const comando = `
    INSERT INTO login (nm_usuario, email, senha, biografia. telefone, cidade, foto_perfil, dt_criacao)
    VALUES (?, ?, MD5(?), ?, ?, ?, ?, ?);
  `;
       const [info] = await conection.query(comando, [
    novoLogin.nm_usuario,
    novoLogin.email,
    novoLogin.senha,
    novoLogin.bibliografia,
    novoLogin.telefone,
    novoLogin.cidade,
    novoLogin.foto_perfil,
    novoLogin.hoje
  ]);
  return info.insertId;
}



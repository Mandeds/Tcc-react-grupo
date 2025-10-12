import { conection } from "./conection.js";


export async function consCredencial(email, senha) {
  const comando = `
    SELECT id,
           email,
           role,
           criacao
      FROM login
     WHERE email = ?
       and senha = MD5(?)
  `;

  const [registros] = await conection.query(comando, [email, senha]);
  return registros[0];
}


export async function criarConta(novoLogin) {
  const comando = `
    INSERT INTO login (email, senha, role, criacao)
               VALUES (?, MD5(?), ?, ?);
  `;

  const [info] = await conection.query(comando, [
    novoLogin.email,
    novoLogin.senha,
    novoLogin.role,
    new Date()
  ]);
  return info.insertId;
}
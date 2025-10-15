import { conection } from "./conection.js";


export async function consutaRegistro(email, senha) {
  const comando = `
    SELECT id,
           email, 
           senha

      FROM login
     WHERE email = ?
       and senha = MD5(?)
  `;

  const [registros] = await conection.query(comando, [email, senha]);
  return registros[0];
}
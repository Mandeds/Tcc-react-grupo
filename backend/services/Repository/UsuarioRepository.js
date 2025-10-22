import connection from "./connection.js";


const hoje = new Date()

export async function CriarUsuario(novoLogin) {
  const comando = `
    INSERT INTO usuario (nm_usuario, email, senha, biografia, telefone, cidade, ehOng, foto_perfil, dt_criacao)
    VALUES (?, ?, MD5(?), ?, ?, ?, ?, ?, ?);
  `;

  const [info] = await connection.query(comando, [
    novoLogin.nm_usuario,
    novoLogin.email,
    novoLogin.senha,
    novoLogin.biografia,
    novoLogin.telefone,
    novoLogin.cidade,
    novoLogin.ehOng || false,  //Caso não venha nada vem como falso independente
    novoLogin.foto_perfil,
    hoje
  ]);

  return info.insertId;
}



export async function loginUsuario(email, senha){
  const comando = `
    SELECT id_usuario, nm_usuario, biografia, telefone, cidade, ehOng, foto_perfil
    FROM usuario
    WHERE email = ? 
    AND 
    senha = MD5(?);
  `
  const [info] = await connection.query(comando, [
    email,
    senha
  ]);
  return info;
}
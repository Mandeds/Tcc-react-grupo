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

export async function LoginUsuario(email, senha) {
  const comando = `
    SELECT id_usuario, nm_usuario, email, biografia, telefone, cidade, ehOng, foto_perfil, dt_criacao
    FROM usuario
    WHERE email = ? AND senha = MD5(?);
  `;

  const [linhas] = await connection.query(comando, [email, senha]);

  if (linhas.length > 0) {
    return linhas[0];
  } else {
    return null;
  }
}

export async function LoginAdmin(email, senha) {
  const comando = `
    SELECT id_admin, email, biografia, telefone, cidade, ehOng, foto_perfil, dt_criacao
    FROM administrador
    WHERE email = ? AND senha = MD5(?);
  `;

  const [linhas] = await connection.query(comando, [email, senha]);

  if (linhas.length > 0) {
    return linhas[0];
  } else {
    return null;
  }
}

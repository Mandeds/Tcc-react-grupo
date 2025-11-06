import connection from "./connection.js";


const hoje = new Date()

export async function CriarUsuario(novoLogin) {
  try {
    console.log("Executando query com:", novoLogin);
    
    const comando = `
      INSERT INTO usuario (nm_usuario, email, senha, biografia, telefone, cidade, ehOng, foto_perfil, dt_criacao)
      VALUES (?, ?, MD5(?), ?, ?, ?, ?, ?, ?);
    `;

    const [info] = await connection.query(comando, [
      novoLogin.nm_usuario,
      novoLogin.email,
      novoLogin.senha,
      novoLogin.biografia || null,
      novoLogin.telefone,
      novoLogin.cidade,
      novoLogin.ehOng || false,
      novoLogin.foto_perfil || null, 
      hoje
    ]);

    console.log("Usuário criado com ID:", info.insertId);
    return info.insertId;
    
  } catch (error) {
    console.error("Erro no repositório:", error);
    throw error;
  }
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

export async function VerificarAdm (cred) {
  let [registro] = await connection.query(`
    SELECT id_admin
    FROM administrador
    WHERE email = ?
    AND senha = MD5(?)
    `, [
      cred.email,
      cred.senha])
    return registro
}
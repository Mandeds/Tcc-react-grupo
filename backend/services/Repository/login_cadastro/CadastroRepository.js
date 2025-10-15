import { conection } from "../../conection";


export async function CriarUsuario(novoLogin) {
    const comando = `
    INSERT INTO login (nm_usuario, email, senha, biografia. telefone, cidade, foto_perfil, dt_criacao)
    VALUES (?, ?, MD5(?), ?, ?, ?, ?, ?);
  `;
    try{
       const [info] = await conection.query(comando, [
    novoLogin.email,
    novoLogin.senha,
    novoLogin.nm_usuario,
    novoLogin.bibliografia,
    novoLogin.telefone,
    novoLogin.cidade,
    novoLogin.foto_perfil,
    novoLogin.dt_criacao
  ]);
  return info.insertId;
    } catch (erro) {
            console.error('Tente novamente, algo esta errado');
    }
}



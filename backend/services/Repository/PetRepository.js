import connection from "./connection";

export async function PetCadastro (novoPet) {
    const comando = 'Insert into pet ( nm_pet, especie,raca,idade, sexo, porte, descricao, estado_fisico,fotos, vacinado, vacinas_qual, castrado, localizacao, data_castrado ';

     const [info] = await connection.query(comando, [
        novoPet.nm_pet,
        novoPet.especie,
        novoPet.raca,
        novoPet.idade,
        novoPet.sexo,
        novoPet.porte,
        novoPet.descricao,
        novoPet.estado_fisico,
        novoPet.foto,
        novoPet.vacinado,
        novoPet.vacianas_qual,
        novoPet.cadastro,
        novoPet.localizacao,
        novoPet.data_cadastrado
     ])
     return info.insertId;
}
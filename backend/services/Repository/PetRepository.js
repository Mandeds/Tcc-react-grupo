import connection from "./connection";

import connection from "./connection.js";

export async function PetCadastro(novoPet) {
  const comando = `
    INSERT INTO pet (
      id_usuario,
      nm_pet,
      especie,
      raca,
      idade,
      sexo,
      porte,
      descricao,
      estado_fisico,
      fotos,
      vacinado,
      vacinas_qual,
      castrado,
      localizacao,
      data_castrado
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [info] = await connection.query(comando, [
    novoPet.id_usuario,
    novoPet.nm_pet,
    novoPet.especie,
    novoPet.raca,
    novoPet.idade,
    novoPet.sexo,
    novoPet.porte,
    novoPet.descricao,
    novoPet.estado_fisico,
    novoPet.fotos,
    novoPet.vacinado,
    novoPet.vacinas_qual,
    novoPet.castrado,
    novoPet.localizacao,
    novoPet.data_castrado
  ]);

  return info.insertId;
}

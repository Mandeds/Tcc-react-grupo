import * as repo from '../Repository/PetRepository.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.post('/petcadastro', async (req, res) => {
  try {
    const dados = req.body;
    const novoId = await repo.PetCadastro(dados);
    res.status(201).send({ id_pet: novoId, mensagem: 'Pet cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ erro: 'Erro ao cadastrar pet.' });
  }
});


endpoints.get('/posts', async (req, res) => {
    const lista = await repo.listarPets();
    res.send(lista);
  }
);


export default endpoints;


/*
{
  "id_usuario": 1,
  "nm_pet": "Luna",
  "especie": "Cachorro",
  "raca": "Vira-lata",
  "idade": 3,
  "sexo": "Fêmea",
  "porte": "Médio",
  "descricao": "Muito dócil e brincalhona.",
  "estado_fisico": "Saudável",
  "fotos": "luna.jpg",
  "vacinado": true,
  "vacinas_qual": "Antirrábica, V8",
  "castrado": true,
  "localizacao": "São Paulo",
  "data_castrado": "2023-05-10"
}
*/
import * as repo from "../../Repository/login_cadastro/LoginRepository.js";
import * as repoCad from "../../Repository/login_cadastro/CadastroRepository.js";
import { CriarToken } from '../utils/jwt.js'

import { Router } from "express";
const endpoints = Router();


endpoints.post('/login/conta', async (req, resp) => {
  let novoLogin = req.body;

  let id = await repoCad.CriarUsuario(novoLogin);
  resp.send({ novoId: id });
})


endpoints.post('/login', async (req, resp) => {
  let email = req.body.email;
  let senha = req.body.senha;

  let credenciais = await repo.consutaRegistro(email, senha);

  if (!credenciais) {
    resp.status(401).send({
      erro: 'Credenciais inválidas.'
    });
  }
  else {
    resp.send({
      token: CriarToken(credenciais)
    });
  }
})


export default endpoints;
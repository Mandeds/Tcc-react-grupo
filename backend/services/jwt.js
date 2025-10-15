import jwt from 'jsonwebtoken'

const jwt = require("jsonwebtoken");
const senha = '12344444';

function CriarToken (usuario){
  return jwt.sign(usuario, senha, {expiresIn: '1h'});
}

function VerificarToken (token){
    try{
      return jwt.verify(token, senha);
    } catch{
      return null
    }
}

function Verificar(req, resp, prox){
    const token = req.headers.authorizacao?.replace("A" , "")

    if (!token){
      return resp.status(401).json("TA sem o Token, coloca!")
    } else {
      req.usuario = usuario; prox();
    }
}
import jwt from 'jsonwebtoken'
const KEY = 'animaizinhos'

// FUNÇÃO 1: Criar token - AGORA SEPARADO
export function generateUserToken(userInfo) {
  // Para usuários normais
  return jwt.sign({ ...userInfo, type: 'user' }, KEY)
}

export function generateAdminToken(adminInfo) {
  // Para administradores
  return jwt.sign({ ...adminInfo, type: 'admin' }, KEY)
}

// FUNÇÃO 2: Pegar informações do token (mantém igual)
export function getTokenInfo(req) {
  try {
    let token = req.headers['x-access-token'];
    if (token === undefined)
      token = req.query['x-access-token']

    let signd = jwt.verify(token, KEY);
    return signd;
  }
  catch {
    return null;
  }
}

// FUNÇÃO 3: Middlewares ADAPTADOS para suas tabelas
export function requireAuth(throw401 = true) {
  return (req, resp, next) => {
    try {
      let token = req.headers['x-access-token'];
      if (token === undefined)
        token = req.query['x-access-token'];

      let signd = jwt.verify(token, KEY);
      
      // SALVA na requisição o tipo de usuário
      req.user = signd;
      
      next();
    }
    catch {
      if (throw401) {
        resp.status(401).end();
      } else {
        next();
      }
    }
  }
}

// MIDDLEWARE ESPECÍFICO PARA ADMIN
export function requireAdmin() {
  return (req, resp, next) => {
    try {
      let token = req.headers['x-access-token'];
      if (token === undefined)
        token = req.query['x-access-token'];

      let signd = jwt.verify(token, KEY);
      
      // VERIFICA se é admin
      if (signd.type !== 'admin') {
        return resp.status(403).end(); // Proíbe acesso
      }
      
      req.user = signd;
      next();
    }
    catch {
      resp.status(401).end(); // Token inválido
    }
  }
}

// MIDDLEWARE ESPECÍFICO PARA USUÁRIO NORMAL
export function requireUser() {
  return (req, resp, next) => {
    try {
      let token = req.headers['x-access-token'];
      if (token === undefined)
        token = req.query['x-access-token'];

      let signd = jwt.verify(token, KEY);
      
      // VERIFICA se é usuário normal
      if (signd.type !== 'user') {
        return resp.status(403).end();
      }
      
      req.user = signd;
      next();
    }
    catch {
      resp.status(401).end();
    }
  }
}
import UsuarioController from '../services/controllers/UsuarioController.js'


async function CriarRotas(api) { 
    api.use(UsuarioController);
};


export default CriarRotas;
import CadastroController from '../services/controllers/CadastroController.js'


async function CriarRotas(api) {
    api.use(CadastroController);
    
}


export default CriarRotas;
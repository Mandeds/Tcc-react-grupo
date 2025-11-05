import UsuarioController from '../controllers/UsuarioController.js';
import PetController from '../controllers/PetController.js';
import ChatController from '../controllers/ChatController.js';

async function CriarRotas(api) {
    api.use(UsuarioController);
    api.use(PetController);
    api.use(ChatController);
}

export default CriarRotas;

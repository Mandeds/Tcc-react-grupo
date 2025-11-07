import UsuarioController from '../services/controllers/UsuarioController.js'
import AdminController from '../services/controllers/AdminController.js'
import ChatController from '../services/controllers/ChatController.js'
import PostController from '../services/controllers/PostController.js'


async function CriarRotas(api) {
    api.use(UsuarioController);
    api.use('/admin', AdminController);
    api.use('/chat', ChatController);
    api.use('/post', PostController);

};


export default CriarRotas;
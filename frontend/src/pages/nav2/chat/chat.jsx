import './chat.scss'
import Home from './img/home.png'
import Pesquisa from './img/lupa.png'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


export default function Chat (){
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [idUsuario] = useState(1);
  const [idDestinatario, setIdDestinatario] = useState(2);
  const [buscarUsuario, setBuscarUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [mostrarBusca, setMostrarBusca] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    carregarMensagens();
    carregarUsuarios();
  }, [idUsuario, idDestinatario]);

  useEffect(() => {
    if (buscarUsuario.trim() === '') {
      setUsuariosFiltrados([]);
    } else {
      const filtrados = usuarios.filter(user =>
        user.nome.toLowerCase().includes(buscarUsuario.toLowerCase())
      );
      setUsuariosFiltrados(filtrados);
    }
  }, [buscarUsuario, usuarios]);

  const carregarMensagens = async () => {
    try {
      const response = await fetch(`http://localhost:3000/chat/mensagens/${idUsuario}/${idDestinatario}`);
      const mensagensData = await response.json();
      setMensagens(mensagensData);
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const carregarUsuarios = async () => {
    try {
      const response = await fetch(`http://localhost:3000/chat/usuarios`);
      const usuariosData = await response.json();
      setUsuarios(usuariosData);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/chat/mensagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_remetente: idUsuario,
          id_destinatario: idDestinatario,
          mensagem: novaMensagem
        })
      });

      if (response.ok) {
        setNovaMensagem('');
        carregarMensagens();
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const selecionarUsuario = (usuario) => {
    setIdDestinatario(usuario.id);
    setMostrarBusca(false);
    setBuscarUsuario('');
    carregarMensagens();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensagem();
    }
  };

  return(
    <div className="content-chat">
      <div className="chat-Ladinho">
      <button id="btn_voltar" onClick={() => navigate(-1)}>
       Voltar
      </button>
        <h1>Chat</h1>
        <button>
          <Link to='/naveg'>
            <img src={Home} alt="icon_home" />     
          </Link>
        </button>


        <button onClick={() => setMostrarBusca(!mostrarBusca)}>
          <img src={Pesquisa} alt="Pesquisa" />
        </button>

        {mostrarBusca && (
          <div className="busca-usuarios">
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={buscarUsuario}
              onChange={(e) => setBuscarUsuario(e.target.value)}
              className="input-busca"
            />
            <div className="lista-usuarios">
              {usuariosFiltrados.map(usuario => (
                <div 
                  key={usuario.id} 
                  className="usuario-item"
                  onClick={() => selecionarUsuario(usuario)}
                >
                  {usuario.nome}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="chat-meinho">
        <div className='cima'>
          <div id='user'><h1>Conversa com Usuário {idDestinatario}</h1></div>
        </div>
        
        <div className='Mensagens'>
          {mensagens.map((msg, index) => (
            <div 
              key={index} 
              className={`mensagem ${msg.id_remetente === idUsuario ? 'minha-mensagem' : 'mensagem-outro'}`}
            >
              <p>{msg.mensagem}</p>
              <span>{new Date(msg.data_envio).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input 
            id='Barra'
            type="text" 
            placeholder='Mensagem'
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={enviarMensagem}>Enviar</button>
        </div>
      </div>

      <div className="Ladinho-usuario">
        <h1>Contatos</h1>
      </div>
    </div>
  )
}
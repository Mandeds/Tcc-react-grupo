import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./chat.scss";
import CabecalhoNav from "../../../component/cabecalhonav/cabecalhonav";

export default function Chat() {
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    carregarConversas();
  }, []);

  const carregarConversas = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get('http://localhost:5000/chat/conversas', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      setConversas(response.data);
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
      setError('Erro ao carregar conversas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const buscarUsuario = async () => {
    if (!searchUser.trim()) return;

    try {
      const response = await axios.get(`http://localhost:5000/usuarios/buscar?nick=${searchUser}`, {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      setError('Erro ao buscar usuário.');
    }
  };

  const iniciarConversa = async (idUsuario) => {
    try {
      await axios.post('http://localhost:5000/chat/conversa', {
        id_usuario_destino: idUsuario
      }, {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      // Recarregar conversas após iniciar nova conversa
      carregarConversas();
      setShowSearch(false);
      setSearchUser("");
      setSearchResults([]);
    } catch (error) {
      console.error('Erro ao iniciar conversa:', error);
      setError('Erro ao iniciar conversa.');
    }
  };

  if (loading) {
    return (
      <div className="chat-container">
        <CabecalhoNav />
        <div className="chat-loading">
          <div className="loading-spinner"></div>
          <p>Carregando conversas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <CabecalhoNav />

      <div className="chat-content">
        <div className="chat-header">
          <h1>Mensagens</h1>
          <button
            className="nova-conversa-btn"
            onClick={() => setShowSearch(!showSearch)}
          >
            Nova Conversa
          </button>
        </div>

        {error && (
          <div className="chat-error">
            <p>{error}</p>
          </div>
        )}

        {/* Busca de usuário */}
        {showSearch && (
          <div className="search-user-section">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Buscar usuário por nick..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="search-input"
              />
              <button onClick={buscarUsuario} className="search-btn">
                🔍 Buscar
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((usuario) => (
                  <div key={usuario.id_usuario} className="user-result">
                    <div className="user-info">
                      <span className="user-nick">{usuario.nick}</span>
                      <span className="user-name">{usuario.nm_usuario}</span>
                    </div>
                    <button
                      onClick={() => iniciarConversa(usuario.id_usuario)}
                      className="conversar-btn"
                    >
                      💬 Conversar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Lista de conversas */}
        <div className="conversas-section">
          {conversas.length === 0 ? (
            <div className="empty-chat">
              <div className="empty-icon">💬</div>
              <h3>Nenhuma conversa ainda</h3>
              <p>Comece uma conversa com alguém da comunidade!</p>
              <div className="empty-actions">
                <Link to="/pesquisa" className="action-btn pesquisa">
                  🔍 Encontrar Pessoas
                </Link>
                <button
                  onClick={() => setShowSearch(true)}
                  className="action-btn adicionar"
                >
                  ➕ Adicionar por Nick
                </button>
              </div>
            </div>
          ) : (
            <div className="conversas-list">
              {conversas.map((conversa) => (
                <div key={conversa.id_conversa} className="conversa-item">
                  <div className="user-avatar">
                    {conversa.nm_usuario.charAt(0).toUpperCase()}
                  </div>
                  <div className="conversa-info">
                    <h4>{conversa.nm_usuario}</h4>
                    <p>{conversa.ultima_mensagem || "Nenhuma mensagem ainda"}</p>
                    <span className="conversa-time">
                      {conversa.ultima_mensagem_data ?
                        new Date(conversa.ultima_mensagem_data).toLocaleDateString('pt-BR') :
                        "Nunca"}
                    </span>
                  </div>
                  {conversa.nao_lidas > 0 && (
                    <span className="unread-badge">{conversa.nao_lidas}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

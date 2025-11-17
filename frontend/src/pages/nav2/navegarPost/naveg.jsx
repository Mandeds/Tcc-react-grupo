import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./naveg.scss";
import CabecalhoNav from "../../../component/cabecalhonav/cabecalhonav";
import LikeButton from "../../../component/likeButton/likeButton";
import PetStatus from "../../../component/petStatus/petStatus";

export default function Naveg() {
  const [petsConversados, setPetsConversados] = useState([]);
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError("");

      const conversasResponse = await axios.get('http://localhost:5000/chat/conversas', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      if (conversasResponse.data.length > 0) {
        const idsUsuarios = conversasResponse.data.map(u => u.id_usuario).join(',');
        const petsResponse = await axios.get(`http://localhost:5000/posts/pets/usuarios?usuarios=${idsUsuarios}`, {
          headers: { 'x-access-token': localStorage.getItem('token') }
        });
        setPetsConversados(petsResponse.data);
      }

      const recomendacoesResponse = await axios.get('http://localhost:5000/recomendacoes', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });
      setRecomendacoes(recomendacoesResponse.data);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-text">
        Carregando...
      </div>
    );
  }

  return (
    <div className="naveg-container">
      <CabecalhoNav />

      <div className="naveg-layout">
        {/* Posts no Centro (Instagram style) */}
        <div className="posts-central">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Recomendações como Posts Centrais */}
          <div className="posts-feed">
            {recomendacoes.length === 0 ? (
              <p className="empty-message">
                Nenhuma recomendação disponível no momento.
              </p>
            ) : (
              recomendacoes.map((post) => (
                <div key={post.id_post} className="post-card-central">
                  <div className="post-header">
                    <div className="user-info">
                      <span className="user-name">{post.nm_usuario}</span>
                      {post.nm_pet && (
                        <span className="pet-name">{post.nm_pet} ({post.especie})</span>
                      )}
                    </div>
                    {post.tipo_post === 'perdido' && (
                      <PetStatus status="perdido" tipo="post" />
                    )}
                    {post.tipo_post === 'adocao' && (
                      <PetStatus status="adocao" tipo="post" />
                    )}
                  </div>

                  <div className="post-content">
                    <h3>{post.titulo}</h3>
                    <p>{post.descricao}</p>
                    {post.urgencia && (
                      <span className="urgente-badge">Urgente</span>
                    )}
                  </div>

                  <div className="post-actions">
                    <LikeButton postId={post.id_post} initialLikes={post.likes_count || 0} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Lateral */}
        <div className="chat-lateral">
          <div className="chat-preview">
            <h3>Conversas Recentes</h3>

            {petsConversados.length === 0 ? (
              <p className="empty-chat">
                Nenhuma conversa ainda
              </p>
            ) : (
              <div className="conversas-preview">
                {petsConversados.slice(0, 3).map((pet) => (
                  <div key={pet.id_pet} className="conversa-preview-item">
                    <span className="pet-name">{pet.nm_pet}</span>
                    <span className="owner-name">{pet.nm_usuario}</span>
                  </div>
                ))}
              </div>
            )}

            <Link to="/chat" className="ver-todas-conversas">
              Ver todas as mensagens
            </Link>
          </div>
        </div>

        {/* Barra Lateral Direita */}
        <div className="sidebar-direita">
          <div className="user-profile-sidebar">
            <Link to="/perfil" className="profile-link">
              <div className="user-avatar-sidebar">
                <img src="/default-avatar.png" alt="Avatar" />
              </div>
              <span>Meu Perfil</span>
            </Link>
          </div>

          <nav className="sidebar-nav-direita">
            <Link to="/pesquisa" className="sidebar-link">
              🔍 Pesquisa
            </Link>
            <Link to="/chat" className="sidebar-link">
              💬 Mensagens
            </Link>
            <Link to="/criar-post" className="sidebar-link criar-post">
              ➕ Criar Post
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
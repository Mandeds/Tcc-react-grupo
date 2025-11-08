import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CabecalhoNav from "../../../component/cabecalhonav/cabecalhonav";
import BackButton from "../../../component/backButton/backButton";
import "./pesquisa.scss";

export default function Pesquisa() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtros, setFiltros] = useState({
    tipo: "",
    especie: "",
    localizacao: "",
    urgencia: false
  });
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    buscarPosts();
  }, [filtros]);

  const buscarPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (filtros.tipo) params.append('tipo', filtros.tipo);
      if (filtros.especie) params.append('especie', filtros.especie);
      if (filtros.localizacao) params.append('localizacao', filtros.localizacao);
      if (filtros.urgencia) params.append('urgencia', 'true');

      const response = await axios.get(`http://localhost:5000/posts/listar?${params}`, {
        headers: { 'x-access-token': localStorage.getItem('token') }
      });

      // Filtrar por termo de busca se houver
      let postsFiltrados = response.data;
      if (termoBusca.trim()) {
        postsFiltrados = postsFiltrados.filter(post =>
          post.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
          post.descricao.toLowerCase().includes(termoBusca.toLowerCase()) ||
          (post.nm_pet && post.nm_pet.toLowerCase().includes(termoBusca.toLowerCase()))
        );
      }

      setPosts(postsFiltrados);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      setError('Erro ao carregar posts. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      tipo: "",
      especie: "",
      localizacao: "",
      urgencia: false
    });
    setTermoBusca("");
  };

  if (loading) {
    return (
      <div className="pesquisa-container">
        <CabecalhoNav />
        <BackButton />
        <div className="loading">
          <div className="spinner"></div>
          <p>Buscando pets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pesquisa-container">
      <CabecalhoNav />
      <BackButton />

      <div className="pesquisa-content">
        <h1 className="pesquisa-title">🔍 Encontre seu Novo Amigo</h1>

        {/* Barra de Busca */}
        <div className="busca-barra">
          <input
            type="text"
            placeholder="Buscar por nome do pet, título ou descrição..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="busca-input"
          />
          <button onClick={buscarPosts} className="busca-btn">
            Buscar
          </button>
        </div>

        {/* Filtros */}
        <div className="filtros-section">
          <h3>Filtros</h3>
          <div className="filtros-grid">
            <div className="filtro-item">
              <label>Tipo de Post:</label>
              <select
                value={filtros.tipo}
                onChange={(e) => handleFiltroChange('tipo', e.target.value)}
              >
                <option value="">Todos</option>
                <option value="adocao">Para Adoção</option>
                <option value="perdido">Perdidos</option>
              </select>
            </div>

            <div className="filtro-item">
              <label>Espécie:</label>
              <select
                value={filtros.especie}
                onChange={(e) => handleFiltroChange('especie', e.target.value)}
              >
                <option value="">Todas</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div className="filtro-item">
              <label>Localização:</label>
              <select
                value={filtros.localizacao}
                onChange={(e) => handleFiltroChange('localizacao', e.target.value)}
              >
                <option value="">Todas</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="RS">Rio Grande do Sul</option>
              </select>
            </div>

            <div className="filtro-item">
              <label>
                <input
                  type="checkbox"
                  checked={filtros.urgencia}
                  onChange={(e) => handleFiltroChange('urgencia', e.target.checked)}
                />
                Apenas Urgentes
              </label>
            </div>
          </div>

          <button onClick={limparFiltros} className="limpar-filtros">
            Limpar Filtros
          </button>
        </div>

        {/* Resultados */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="resultados">
          {posts.length === 0 ? (
            <div className="sem-resultados">
              <p>Nenhum pet encontrado com os filtros aplicados.</p>
              <p>Tente ajustar os filtros ou fazer uma nova busca.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map((post) => (
                <div key={post.id_post} className="post-card">
                  {post.fotos && (
                    <div className="post-imagem">
                      <img
                        src={`http://localhost:5000/uploads/${post.fotos}`}
                        alt={post.titulo}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=300';
                        }}
                      />
                    </div>
                  )}

                  <div className="post-content">
                    <h3 className="post-title">{post.titulo}</h3>

                    {post.nm_pet && (
                      <p className="post-pet">
                        <strong>Pet:</strong> {post.nm_pet} ({post.especie})
                      </p>
                    )}

                    <p className="post-descricao">
                      {post.descricao.length > 150
                        ? post.descricao.substring(0, 150) + "..."
                        : post.descricao}
                    </p>

                    <div className="post-meta">
                      <span className="post-autor">Por: {post.nm_usuario}</span>
                      <span className="post-data">
                        {new Date(post.dt_postagem).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    {post.urgencia && (
                      <span className="urgente-badge">Urgente</span>
                    )}

                    <div className="post-actions">
                      <Link
                        to={`/post/${post.id_post}`}
                        className="ver-detalhes-btn"
                      >
                        Ver Detalhes
                      </Link>
                      <Link
                        to={`/chat?usuario=${post.id_usuario}`}
                        className="contato-btn"
                      >
                        💬 Contatar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

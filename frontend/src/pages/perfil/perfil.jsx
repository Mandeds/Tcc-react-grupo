import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../../component/backButton/backButton';
import './perfil.scss';

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({
    nm_usuario: '',
    biografia: '',
    foto_perfil: ''
  });

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/usuarios/perfil', {
        headers: { 'x-access-token': token }
      });

      setUsuario(response.data.usuario);
      setPosts(response.data.posts);
      setLikesCount(response.data.likesCount);
      setFormData({
        nm_usuario: response.data.usuario.nm_usuario,
        biografia: response.data.usuario.biografia || '',
        foto_perfil: response.data.usuario.foto_perfil || ''
      });
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/usuarios/perfil', formData, {
        headers: { 'x-access-token': token }
      });

      alert('Perfil atualizado com sucesso!');
      setEditando(false);
      carregarPerfil();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/posts/${postId}`, {
        headers: { 'x-access-token': token }
      });

      alert('Post deletado com sucesso!');
      carregarPerfil();
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      alert('Erro ao deletar post');
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, foto_perfil: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="perfil-container">
        <BackButton />
        <div className="loading">Carregando perfil...</div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="perfil-container">
        <BackButton />
        <div className="error">Erro ao carregar perfil</div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <BackButton />

      <div className="perfil-header">
        <div className="perfil-avatar">
          <img
            src={usuario.foto_perfil || '/default-avatar.png'}
            alt="Avatar"
            className="avatar-img"
          />
        </div>

        <div className="perfil-info">
          <h1>{usuario.nm_usuario}</h1>
          <p className="email">{usuario.email}</p>
          <p className="cidade">{usuario.cidade}</p>
          <p className="ong">{usuario.ehOng ? 'ONG' : 'Usuário'}</p>
          <div className="likes-stats">
            <span className="hearts-count">❤️ {likesCount}</span>
            <span className="stats-label">likes recebidos</span>
          </div>
        </div>

        <button
          className="editar-btn"
          onClick={() => setEditando(!editando)}
        >
          {editando ? 'Cancelar' : 'Editar Perfil'}
        </button>
      </div>

      {editando && (
        <div className="editar-form">
          <h2>Editar Perfil</h2>

          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={formData.nm_usuario}
              onChange={(e) => setFormData(prev => ({ ...prev, nm_usuario: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label>Biografia:</label>
            <textarea
              value={formData.biografia}
              onChange={(e) => setFormData(prev => ({ ...prev, biografia: e.target.value }))}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Foto de Perfil:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
            />
            {formData.foto_perfil && (
              <img src={formData.foto_perfil} alt="Preview" className="foto-preview" />
            )}
          </div>

          <div className="form-actions">
            <button onClick={handleUpdate} className="salvar-btn">Salvar</button>
            <button onClick={() => setEditando(false)} className="cancelar-btn">Cancelar</button>
          </div>
        </div>
      )}

      <div className="perfil-posts">
        <h2>Meus Posts ({posts.length})</h2>

        {posts.length === 0 ? (
          <p className="no-posts">Você ainda não criou nenhum post.</p>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post.id_post} className="post-card">
                <h3>{post.titulo}</h3>
                <p>{post.descricao}</p>
                <p className="post-date">
                  {new Date(post.dt_postagem).toLocaleDateString('pt-BR')}
                </p>
                <button
                  onClick={() => handleDeletePost(post.id_post)}
                  className="delete-post-btn"
                >
                  Deletar Post
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './criarPost.scss';

function CriarPost() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoPost, setTipoPost] = useState('doacao');
  const [urgencia, setUrgencia] = useState(false);
  const [foto, setFoto] = useState(null);
  const [idPet, setIdPet] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('titulo', titulo);
      formData.append('descricao', descricao);
      formData.append('tipo_post', tipoPost);
      formData.append('urgencia', urgencia);
      if (idPet) formData.append('id_pet', idPet);
      if (foto) formData.append('foto', foto);

      await axios.post('http://localhost:5000/post/criar', formData, {
        headers: {
          'x-access-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Post criado com sucesso!');
      navigate('/naveg'); // Redirecionar para navegação
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setErro(error.response?.data?.error || 'Erro ao criar post');
    } finally {
      setLoading(false);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErro('Imagem muito grande. Máximo 5MB.');
        return;
      }
      // Validar tipo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErro('Tipo de arquivo não permitido. Use apenas imagens.');
        return;
      }
      setFoto(file);
      setErro('');
    }
  };

  return (
    <div className="criar-post-container">
      <h1>Criar Novo Post</h1>

      <form onSubmit={handleSubmit} className="criar-post-form">
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Digite o título do post"
          />
        </div>

        <div className="form-group">
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
            placeholder="Descreva o post em detalhes"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Tipo de Post:</label>
          <select value={tipoPost} onChange={(e) => setTipoPost(e.target.value)}>
            <option value="doacao">Doação</option>
            <option value="adocao">Adoção</option>
            <option value="perdido">Animal Perdido</option>
            <option value="encontrado">Animal Encontrado</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={urgencia}
              onChange={(e) => setUrgencia(e.target.checked)}
            />
            Urgente
          </label>
        </div>

        <div className="form-group">
          <label>ID do Pet (opcional):</label>
          <input
            type="number"
            value={idPet}
            onChange={(e) => setIdPet(e.target.value)}
            placeholder="Se o post for sobre um pet específico"
          />
        </div>

        <div className="form-group">
          <label>Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
          />
          {foto && <p>Arquivo selecionado: {foto.name}</p>}
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Post'}
        </button>
      </form>
    </div>
  );
}

export default CriarPost;

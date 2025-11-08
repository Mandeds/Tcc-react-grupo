import { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.scss';
import BackButton from '../../component/backButton/backButton';

function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [abaAtiva, setAbaAtiva] = useState('usuarios');

  useEffect(() => {
    if (abaAtiva === 'usuarios') {
      carregarUsuarios();
    } else if (abaAtiva === 'sugestoes') {
      carregarSugestoes();
    }
  }, [abaAtiva]);

  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      setErro('');
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/admin/usuarios', {
        headers: { 'x-access-token': token }
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      setErro('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const carregarSugestoes = async () => {
    try {
      setLoading(true);
      setErro('');
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/admin/sugestoes', {
        headers: { 'x-access-token': token }
      });
      setSugestoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
      setErro('Erro ao carregar sugestões');
    } finally {
      setLoading(false);
    }
  };

  const toggleBan = async (id, banidoAtual) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/admin/usuarios/${id}/banir`, {
        banido: !banidoAtual
      }, {
        headers: { 'x-access-token': token }
      });
      // Recarregar lista
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao banir/desbanir usuário:', error);
      alert('Erro ao alterar status do usuário');
    }
  };

  const deletarUsuario = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/admin/usuarios/${id}`, {
        headers: { 'x-access-token': token }
      });
      // Recarregar lista
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário');
    }
  };

  const deletarSugestao = async (id) => {
    if (!confirm('Tem certeza que deseja deletar esta sugestão?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/admin/sugestoes/${id}`, {
        headers: { 'x-access-token': token }
      });
      // Recarregar lista
      carregarSugestoes();
    } catch (error) {
      console.error('Erro ao deletar sugestão:', error);
      alert('Erro ao deletar sugestão');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div className="admin-container">
      <BackButton />
      <h1>Painel Administrativo</h1>

      {/* Abas de navegação */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${abaAtiva === 'usuarios' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('usuarios')}
        >
          Gerenciar Usuários
        </button>
        <button
          className={`tab-button ${abaAtiva === 'sugestoes' ? 'active' : ''}`}
          onClick={() => setAbaAtiva('sugestoes')}
        >
          Sugestões ({sugestoes.length})
        </button>
      </div>

      {/* Conteúdo da aba Usuários */}
      {abaAtiva === 'usuarios' && (
        <div className="aba-content">
          <h2>Gerenciar Usuários</h2>
          <div className="usuarios-list">
            {usuarios.map(usuario => (
              <div key={usuario.id_usuario} className="usuario-card">
                <div className="usuario-info">
                  <h3>{usuario.nm_usuario}</h3>
                  <p>Email: {usuario.email}</p>
                  <p>Cidade: {usuario.cidade}</p>
                  <p>ONG: {usuario.ehOng ? 'Sim' : 'Não'}</p>
                  <p>Status: {usuario.banido ? 'Banido' : 'Ativo'}</p>
                </div>
                <div className="usuario-actions">
                  <button
                    onClick={() => toggleBan(usuario.id_usuario, usuario.banido)}
                    className={usuario.banido ? 'desbanir' : 'banir'}
                  >
                    {usuario.banido ? 'Desbanir' : 'Banir'}
                  </button>
                  <button
                    onClick={() => deletarUsuario(usuario.id_usuario)}
                    className="deletar"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo da aba Sugestões */}
      {abaAtiva === 'sugestoes' && (
        <div className="aba-content">
          <h2>Sugestões dos Usuários</h2>
          <div className="sugestoes-list">
            {sugestoes.length === 0 ? (
              <div className="empty-sugestoes">
                <p>Nenhuma sugestão recebida ainda.</p>
              </div>
            ) : (
              sugestoes.map(sugestao => (
                <div key={sugestao.id_sugestao} className="sugestao-card">
                  <div className="sugestao-header">
                    <div className="usuario-info">
                      <h4>{sugestao.nm_usuario}</h4>
                      <p>{sugestao.email}</p>
                    </div>
                    <div className="sugestao-date">
                      {new Date(sugestao.dt_criacao).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="sugestao-content">
                    <p>{sugestao.mensagem}</p>
                  </div>
                  <div className="sugestao-actions">
                    <button
                      onClick={() => deletarSugestao(sugestao.id_sugestao)}
                      className="deletar"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

import { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.scss';

function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
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

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>{erro}</div>;

  return (
    <div className="admin-container">
      <h1>Painel Administrativo</h1>
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
  );
}

export default Admin;

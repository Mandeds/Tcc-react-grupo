import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './cadastro.scss'
import axios from 'axios';

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repeteSenha, setRepeteSenha] = useState("");
  const [biografia, setBiografia] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [ehOng, setEhOng] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    
    if (!nome.trim()) {
      setErro("Digite seu nome");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setErro("Digite um email válido");
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      setErro("Senha muito curta (mínimo 6 caracteres)");
      setLoading(false);
      return;
    }

    if (senha !== repeteSenha) {
      setErro("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      
      const usuarioData = {
        nm_usuario: nome,
        email: email,
        senha: senha,
        biografia: biografia,
        telefone: telefone,
        cidade: cidade,
        ehOng: ehOng,
        foto_perfil: "" 
      };

      
      const response = await axios.post('http://localhost:3000/cadastro', usuarioData);
      
      if (response.data.NovoId) {
        alert("Cadastro realizado com sucesso!");
        navigate("/"); 
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      if (error.response?.data?.error) {
        setErro(error.response.data.error);
      } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        setErro("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setErro("Erro ao realizar cadastro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="cadastro-icon">
          <span>Cadastro</span>
        </div>
        <h2>Cadastro</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="cadastro-input"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            className="cadastro-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="cadastro-input"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <input
            type="password"
            className="cadastro-input"
            placeholder="Repita a senha"
            value={repeteSenha}
            onChange={(e) => setRepeteSenha(e.target.value)}
            required
          />

          <input
            type="text"
            className="cadastro-input"
            placeholder="Telefone (opcional)"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            type="text"
            className="cadastro-input"
            placeholder="Cidade (opcional)"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />

          <textarea
            className="cadastro-input"
            placeholder="Biografia (opcional)"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          />

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="ehOng"
              checked={ehOng}
              onChange={(e) => setEhOng(e.target.checked)}
            />
            <label htmlFor="ehOng">É uma ONG?</label>
          </div>

          {erro && (
            <p className="cadastro-error">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="cadastro-button"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="cadastro-register">
          <p>Já tem conta? <Link to="/">Entrar</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
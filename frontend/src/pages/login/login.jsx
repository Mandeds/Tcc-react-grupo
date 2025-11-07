import './login.scss';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        senha: senha
      });

      if (response.data.token) {
        // Armazenar token no localStorage
        localStorage.setItem('token', response.data.token);
        alert("Login realizado com sucesso!");
        navigate("/naveg"); // Redirecionar para navegação
      }
    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response?.data?.error) {
        setErro(error.response.data.error);
      } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
        setErro("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setErro("Erro ao realizar login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <FaUser color="white" size={35} />
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              placeholder="Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="login-input"
            />
          </div>

          {erro && <p className="login-error">{erro}</p>}

          <div className="login-options">
            <label>
              <input type="checkbox" /> Relembrar
            </label>
            <Link to="#">Esqueceu a senha?</Link>
          </div>

          
          <button
            type="submit"
            className="login-button"
            disabled={loading}
            style={{
              background: loading ? "#ccc" : undefined,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <Link to="/Naveg">Entrar</Link>

          <div className="login-register">
            <p>Não tem conta?</p>
            <Link to="/cadastro">Fazer cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
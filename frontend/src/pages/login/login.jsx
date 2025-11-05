import './login.scss';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import api from '../../api.js'; // ajuste o caminho conforme sua estrutura

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setErro("");

  // Validação básica no frontend
  if (!email || !senha) {
    setErro("Por favor, preencha todos os campos");
    return;
  }

  try {
    const response = await api.post('/login', {
      email: email,
      senha: senha
    });

    // Salva o token no localStorage
    localStorage.setItem('token', response.data.token);
    
    // Salva informações do usuário se vierem na resposta
    if (response.data.usuario) {
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    }
    
    alert("Login realizado com sucesso!");
    window.location.href = '/naveg';

  } catch (error) {
    console.error('Erro no login:', error);
    if (error.response && error.response.status === 401) {
      setErro("Email ou senha inválidos");
    } else if (error.response && error.response.data.message) {
      setErro(error.response.data.message);
    } else {
      setErro("Erro ao fazer login. Tente novamente.");
    }
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
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
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
              required
            />
          </div>

          {erro && <p className="login-error">{erro}</p>}

          <div className="login-options">
            <label>
              <input type="checkbox" /> Relembrar
            </label>
            <Link to="#">Esqueceu a senha?</Link>
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <div className="login-register">
            <p>Não tem conta?</p>
            <Link to="/cadastro">Fazer cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
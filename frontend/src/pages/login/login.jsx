import './login.scss';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMessage("");

    try {
      await axios.post('http://localhost:5000/forgot-password', {
        email: forgotEmail
      });

      setForgotMessage("Email de recuperação enviado com sucesso!");
      setForgotEmail("");
    } catch (error) {
      console.error("Erro no forgot-password:", error);
      if (error.response?.data?.error) {
        setForgotMessage(error.response.data.error);
      } else {
        setForgotMessage("Erro ao enviar email. Tente novamente.");
      }
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <span>Login</span>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
          />

          {erro && <p className="login-error">{erro}</p>}

          <div className="login-options">
            <label>
              <input type="checkbox" /> Relembrar
            </label>
            <button
              type="button"
              className="forgot-password-link"
              onClick={() => setShowForgotPassword(true)}
            >
              Esqueceu a senha?
            </button>
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

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Recuperar Senha</h3>
              <p>Digite seu email para receber um link de recuperação:</p>
              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  placeholder="Seu email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="login-input"
                  required
                />
                {forgotMessage && <p className={`forgot-message ${forgotMessage.includes('sucesso') ? 'success' : 'error'}`}>{forgotMessage}</p>}
                <div className="modal-buttons">
                  <button
                    type="submit"
                    className="login-button"
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? "Enviando..." : "Enviar Email"}
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

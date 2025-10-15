import './login.scss';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "teste@gmail.com" && senha === "123456") {
      alert("Login realizado com sucesso!");
    } else {
      setErro("Email ou senha inválidos");
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

          <button type="submit" className="login-button">Entrar</button>

          <div className="login-register">
            <p>Não tem conta?</p>
            <Link to="/cadastro">Fazer cadastro</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
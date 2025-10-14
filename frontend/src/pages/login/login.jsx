import './login.scss';
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div style={{ 
      display: "flex", alignItems: "center", justifyContent: "center", height: "100vh",
      background: "linear-gradient(white, orange)"
    }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "15px", width: "300px", textAlign: "center" }}>
        <div style={{ background: "orange", borderRadius: "50%", width: "60px", height: "60px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
        
        </div>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Gmail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: "100%", padding: "8px", margin: "10px 0" }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            style={{ width: "100%", padding: "8px", margin: "10px 0" }} 
          />
          {erro && <p style={{ color: "red", fontSize: "12px" }}>{erro}</p>}
          <Link to="/" type="submit" style={{ width: "100%", padding: "10px", background: "orange", border: "none", color: "white", marginTop: "10px" }}>Entrar</Link>
        </form>
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Não tem conta? <Link to="/cadastro" style={{ color: "blue" }}>Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repeteSenha, setRepeteSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setErro("Digite um email válido");
      return;
    }

    if (senha.length < 6) {
      setErro("Senha muito curta (mínimo 6 caracteres)");
      return;
    }

    if (senha !== repeteSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    setErro("");
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div style={{ 
      display: "flex", alignItems: "center", justifyContent: "center", height: "100vh",
      background: "linear-gradient(white, orange)"
    }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "15px", width: "350px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Cadastro</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="email" 
            placeholder="Gmail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: "100%", padding: "8px", margin: "10px 0" }} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            style={{ width: "100%", padding: "8px", margin: "10px 0" }} 
          />
          <input 
            type="password" 
            placeholder="Repita a senha" 
            value={repeteSenha} 
            onChange={(e) => setRepeteSenha(e.target.value)} 
            style={{ width: "100%", padding: "8px", margin: "10px 0" }} 
          />
          {erro && <p style={{ color: "red", fontSize: "12px" }}>{erro}</p>}
          <button type="submit" style={{ width: "100%", padding: "10px", background: "orange", border: "none", color: "white", marginTop: "10px" }}>Cadastrar</button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "14px", textAlign: "center" }}>
          Já tem conta? <Link to="/login" style={{ color: "blue" }}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;

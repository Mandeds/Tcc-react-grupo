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
    <div style={{ 
      display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh",
      background: "linear-gradient(white, #A36217)",
      padding: "20px"
    }}>
      <div style={{ 
        background: "white", 
        padding: "30px", 
        borderRadius: "15px", 
        width: "100%", 
        maxWidth: "400px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Cadastro</h2>
        
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Nome completo" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            style={{ width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px" }} 
            required
          />
          
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px" }} 
            required
          />
          
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            style={{ width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px" }} 
            required
          />
          
          <input 
            type="password" 
            placeholder="Repita a senha" 
            value={repeteSenha} 
            onChange={(e) => setRepeteSenha(e.target.value)} 
            style={{ width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px" }} 
            required
          />
          
          <input 
            type="text" 
            placeholder="Telefone (opcional)" 
            value={telefone} 
            onChange={(e) => setTelefone(e.target.value)} 
            style={{ width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px" }} 
          />
          
          <input 
            type="text" 
            placeholder="Cidade (opcional)" 
            value={cidade} 
            onChange={(e) => setCidade(e.target.value)} 
            style={{ width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px" }} 
          />
          
          <textarea 
            placeholder="Biografia (opcional)" 
            value={biografia} 
            onChange={(e) => setBiografia(e.target.value)} 
            style={{ width: "100%", padding: "12px", margin: "8px 0", border: "1px solid #ddd", borderRadius: "8px", minHeight: "80px", resize: "vertical" }} 
          />
          
          <div style={{ margin: "10px 0" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input 
                type="checkbox" 
                checked={ehOng} 
                onChange={(e) => setEhOng(e.target.checked)} 
              />
              <span>É uma ONG?</span>
            </label>
          </div>

          {erro && (
            <p style={{ 
              color: "red", 
              fontSize: "14px", 
              textAlign: "center", 
              margin: "10px 0",
              padding: "8px",
              backgroundColor: "#ffe6e6",
              borderRadius: "4px"
            }}>
              {erro}
            </p>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: loading ? "#ccc" : "orange", 
              border: "none", 
              color: "white", 
              marginTop: "10px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        
        <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "center", color: "#666" }}>
          Já tem conta? <Link to="/" style={{ color: "blue", textDecoration: "none" }}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
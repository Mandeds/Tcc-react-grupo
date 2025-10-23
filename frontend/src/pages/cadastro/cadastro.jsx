import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router'
import './cadastro.scss'
import Cabecalho1 from "../../component/cabecalho1/cabecalho1";
import Footer from "../../component/footer/footer";
import api from "../../api";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repeteSenha, setRepeteSenha] = useState("");
  const [biografia, setBiografia] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [ehOng, setEhOng] = useState(false);

  

  const navigate = useNavigate();

  async function HandleCadastro(){
    e.preventDefault();
    try {
      const response = await api.post('/cadastro', {
        nm_usuario:nome,
        email:email,
        senha:senha,
        biografia:biografia,
        telefone:telefone,
        cidade:cidade,
        ehOng:ehOng
      })
      console.log(`Cadastro feito ${response.data}`)
      alert("SEJA BEM VINDO");
      api.post('/usuario', {
        email: email,
        senha: senha
    })
        .then(response => {
            console.log(response.data);
            const token = response.data.token
            localStorage.setItem("token", token)
            navigate('/perfil')
        })
      
    } catch (error) {
      console.error('Erro ao cadastrar:', error.response?.data || error.message);
    }
  }

  return (
    <div className="cadastro-container">
      <Cabecalho1 />
      <div className="cadastro-box">
        <div className="form-container">
          <h2>Cadastro</h2>
          
          
          <form>
            <input 
              type="text" 
              placeholder="Nome completo" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)}  
              required
            />
            
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            
            <input 
              type="password" 
              placeholder="Senha" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required
            />
            
            <input 
              type="password" 
              placeholder="Confirme sua senha" 
              value={repeteSenha} 
              onChange={(e) => setRepeteSenha(e.target.value)} 
              required
            />
            
            <input 
              type="text" 
              placeholder="Telefone" 
              value={telefone} 
              onChange={(e) => setTelefone(e.target.value)} 
            />
            
            <input 
              type="text" 
              placeholder="Cidade" 
              value={cidade} 
              onChange={(e) => setCidade(e.target.value)}  
            />
            
            <textarea 
              placeholder="Biografia (opcional)" 
              value={biografia} 
              onChange={(e) => setBiografia(e.target.value)} 
            />
            
            <div className="checkbox-container">
              <label>
                <input 
                  type="checkbox" 
                  checked={ehOng} 
                  onChange={(e) => setEhOng(e.target.checked)} 
                />
                <span>É uma ONG?</span>
              </label>
            </div>

            <button 
              type="submit" 
              onClick={HandleCadastro}
            >
              Cadastrar
            </button>
          </form>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: loading ? "#ccc" : "#A36217", 
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
        </div>
        
        <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "center", color: "#666" }}>
          Já tem conta? <Link to="/" style={{ color: "blue", textDecoration: "none" }}>Entrar</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Cadastro;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./cadastro.scss";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repeteSenha, setRepeteSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [ehOng, setEhOng] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    setErro("");

    if (!nome || !email || !senha || !repeteSenha) {
      setErro("Preencha os campos obrigatórios");
      return;
    }

    if (senha !== repeteSenha) {
      setErro("Senhas não conferem");
      return;
    }

    setLoading(true);

    api.post("/cadastro", { nm_usuario: nome, email, senha, telefone, cidade, ehOng })
      .then((res) => {
        console.log("Cadastrado:", res.data);
        // login automático simplificado
        api.post("/login", { email, senha })
          .then((loginRes) => {
            if (loginRes.data.token) localStorage.setItem("token", loginRes.data.token);
            navigate("/perfil");
          })
          .catch(() => navigate("/perfil"));
      })
      .catch((err) => setErro(err.response?.data?.message || "Erro ao cadastrar"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-wrapper">
        <div className="avatar-top">
          <div className="avatar-icon"></div>
        </div>

        <div className="cadastro-box">
          <h2>Cadastro</h2>
          {erro && <p className="error-message">{erro}</p>}

          <form onSubmit={handleCadastro} className="cad-form">
            <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
            <input type="password" placeholder="Repita a senha" value={repeteSenha} onChange={e => setRepeteSenha(e.target.value)} />
            <input type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
            <input type="text" placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
            
            <label className="chk-label">
              <input type="checkbox" checked={ehOng} onChange={e => setEhOng(e.target.checked)} />
              É uma ONG?
            </label>

            <button type="submit">{loading ? "Cadastrando..." : "Cadastrar"}</button>
          </form>

          <div className="login-link">
            <p>Já tem conta? <Link to="/">Entrar</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;


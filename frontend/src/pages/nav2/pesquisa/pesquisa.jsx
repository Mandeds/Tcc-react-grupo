import "./Pesquisa.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export default function Pesquisa() {
  const [busca, setBusca] = useState("");
  const [pets, setPets] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    carregarPets();
  }, []);

  async function carregarPets() {
    try {
      setLoading(true);
      const resposta = await api.get("/posts");
      setPets(resposta.data);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar os pets.");
    } finally {
      setLoading(false);
    }
  }

  const filtrados = pets.filter((pet) =>
    pet.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pesquisa-container">
      <h1 id="titulo_pesquisa">Laços & Patas</h1>

      <input
        id="barra_pesquisa"
        type="text"
        placeholder="Buscar cachorro..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <button id="btn_voltar" onClick={() => navigate(-1)}>
         Voltar
      </button>

      {loading && <p className="status">Carregando pets...</p>}
      {erro && <p className="erro">{erro}</p>}

      <div className="lista-pets">
        {filtrados.map((pet) => (
          <div key={pet.id_pet} className="card-pet">
            <img
              src={pet.foto || "/images/default_pet.png"}
              alt={pet.nome}
              className="img-pet"
            />
            <h3>{pet.nome}</h3>
            <p>{pet.descricao}</p>
            <p><strong>Cidade:</strong> {pet.cidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

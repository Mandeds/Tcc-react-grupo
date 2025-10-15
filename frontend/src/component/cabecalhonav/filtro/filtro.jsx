import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import "./filtro.scss";

export default function Filtros() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="filtro-container">
      {/* Botão flutuante */}
      {!aberto && (
        <button className="filtro-btn" onClick={() => setAberto(true)}>
          <FaFilter />
        </button>
      )}

      {/* Barra de filtros */}
      {aberto && (
        <div className="filtro-barra">
          <div className="filtro-item">
            <label>🐾 Tipo de Animal</label>
            <select>
              <option>Todos</option>
              <option>Cachorro</option>
              <option>Gato</option>
            </select>
          </div>

          <div className="filtro-item">
            <label>📍 Localização</label>
            <select>
              <option>Todos</option>
              <option>SP</option>
              <option>RJ</option>
              <option>MG</option>
            </select>
          </div>

          <div className="filtro-item">
            <label>⌛ Idade</label>
            <select>
              <option>Todas</option>
              <option>Filhote</option>
              <option>Adulto</option>
              <option>Idoso</option>
            </select>
          </div>

          <div className="filtro-item">
            <label>💖 Necessidades Especiais</label>
            <select>
              <option>Todos</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <button className="filtro-fechar" onClick={() => setAberto(false)}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
}

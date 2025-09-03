import React from "react";
import { useNavigate } from "react-router-dom";

import "./home.scss";
import "../scss/global.scss";
import "../scss/font.scss"

function Home(){

  const navigate = useNavigate();

  return (
    <div id="body_home">
      <div className="Componentes_home">
        <img id="logo_home" src="" alt="Logo" />
        <h1 id="a">Laços &</h1>
        <h1 id="b">Patas</h1>
      </div>

      <div className="article_home">
        <div className="carrocel"></div>
      </div>

      <div class="aside_home">
        <p class="font_reta">
          Compartilhe momentos, publique fotos, encontre novos lares e faça
          parte dessa rede de amor e adoção.
        </p>
        <div className="botoes">
          <button onClick={() => navigate("../test/test.jsx")}>Ir para teste</button>

        </div>
      </div>
    </div>
  );
};

export default Home;

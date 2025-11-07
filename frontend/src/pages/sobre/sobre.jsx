import React from "react";
import "./sobre.scss";
import { Link } from "react-router";
import Footer from "../../component/footer/footer";
import { useNavigate } from "react-router-dom";

export function Sobre() {
  
  const navigate = useNavigate();

  return (

    <div className="container">
      <header className="topo">

      <button id="btn_voltar" onClick={() => navigate(-1)}>
         Voltar
      </button>

        <h1> Laços & Patas</h1>
      </header>

      <section id="sobre" className="sobre">
        <h2>Sobre</h2>
        <p>
          O <b>Laços & Patas</b> é uma ONG apaixonada por animais e comprometida
          em transformar a vida de cães abandonados. Nosso trabalho começa com o
          <b> resgate</b> de animais em situação de rua — oferecendo cuidados
          veterinários, alimentação, abrigo e muito carinho.
        </p>
        <p>
          Após o resgate, os cães passam por um processo de <b>reabilitação e
          socialização</b> para que estejam prontos para receber um novo lar.
          Realizamos campanhas de adoção responsáveis, entrevistas e visitas
          prévias sempre que possível para garantir o bem-estar do animal e a
          segurança da nova família.
        </p>
        <p>
          Nossa equipe é formada por <b>voluntários e parceiros</b> (veterinários,
          pet shops e apoiadores locais) que ajudam na alimentação, atendimento
          veterinário, transporte e divulgação dos animais. Também promovemos
          ações educativas na comunidade para incentivar a castração, vacinação e
          a adoção consciente.
        </p>
        <p>
          A ONG sobrevive graças às <b>doações</b> — ração, medicamentos, material
          de limpeza e contribuições financeiras — que permitem manter abrigos e
          atender mais animais. Cada contribuição faz uma diferença real na vida
          de um pet.
        </p>
        <p>
          <b>
            Junte-se a nós: adote, apadrinhe, torne-se voluntário ou doe. Vamos
            juntos espalhar amor e cuidado! 
          </b>
        </p>
      </section>

      <Footer/>
    </div>

  );
}

export default Sobre;


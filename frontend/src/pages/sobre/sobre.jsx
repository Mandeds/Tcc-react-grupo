import React from 'react';
import "./sobre.scss"


export function Sobre() {
  return (
    <div className="container">
      <header className="topo">
        <h1>🐾 Amigos de Patas</h1>
        <nav>
          <a href="#contato">Contato</a>
          <button>Doar</button>
        </nav>
      </header>

      <section id="sobre" className="sobre">
        <h2>Sobre</h2>
        <p>
          O <b>Amigos de Patas</b> é uma ONG apaixonada por animais e comprometida
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
            juntos espalhar amor e cuidado! ❤️
          </b>
        </p>
      </section>

      <footer className="rodape">
        <p>© {new Date().getFullYear()} Amigos de Patas — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default Sobre;

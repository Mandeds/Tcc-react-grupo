import { Link } from "react-router"
import './sobre.scss'
import Cabecalho1 from "../../component/cabecalho1/cabecalho1.jsx";
import Footer from "../../component/footer/footer";

function Sobre() {
  const dogs = [
    { id: 1, nome: 'Luna', desc: 'Cadelinha carinhosa, 2 anos', img: '' },
    { id: 2, nome: 'Thor', desc: 'Brincalhão, adora crianças', img: '' },
    { id: 3, nome: 'Mia', desc: 'Calma e dócil, ótima pra apartamento', img: '' },
  ];

  return (
    <div className="container">
      <Cabecalho1/>

      <section id="sobre" className="sobre">
        <h2>Sobre</h2>
        <p>O <b>Amigos de Patas</b> é uma organização dedicada a resgatar, cuidar e encontrar lares amorosos para cães abandonados ou em situação de risco.</p>
        <p>Acreditamos que todo cachorro merece uma segunda chance e uma vida cheia de carinho, segurança e respeito.</p>
        <p>Nosso trabalho é feito com o apoio de voluntários, doadores e parceiros que compartilham o mesmo amor pelos animais. Aqui, cada latido conta uma história, e cada adoção representa um novo começo.</p>
        <p>Além do resgate e adoção, também promovemos campanhas de conscientização, castração e arrecadação de alimentos, buscando construir uma comunidade mais empática e responsável com os animais.</p>
        <p><b>Venha fazer parte dessa causa — adote, apadrinhe ou contribua!</b></p>
      </section>

      <section id="adote" className="adote">
        <h2>Adote um Amigo</h2>
        <div className="cards">
          {dogs.map((dog) => (
            <div key={dog.id} className="card">
              <img src={dog.img} alt={dog.nome} />
              <h3>{dog.nome}</h3>
              <p>{dog.desc}</p>
              <button>Quero Adotar</button>
            </div>
          ))}
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default Sobre;
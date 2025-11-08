import { useState } from "react";
import { Link } from "react-router"
import './sobre.scss'
import Cabecalho1 from "../../component/cabecalho1/cabecalho1.jsx";
import Footer from "../../component/footer/footer";
import BackButton from "../../component/backButton/backButton";
import axios from "axios";

function Sobre() {
  const [mensagemSuporte, setMensagemSuporte] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagemEnviada, setMensagemEnviada] = useState(false);

  const dogs = [
    { id: 1, nome: 'Luna', desc: 'Cadelinha carinhosa, 2 anos', img: '' },
    { id: 2, nome: 'Thor', desc: 'Brincalhão, adora crianças', img: '' },
    { id: 3, nome: 'Mia', desc: 'Calma e dócil, ótima pra apartamento', img: '' },
  ];

  const enviarMensagemSuporte = async (e) => {
    e.preventDefault();
    if (!mensagemSuporte.trim()) return;

    setEnviando(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/chat/suporte', {
        mensagem: mensagemSuporte.trim()
      }, {
        headers: { 'x-access-token': token }
      });

      setMensagemSuporte('');
      setMensagemEnviada(true);
      setTimeout(() => setMensagemEnviada(false), 3000);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container">
      <Cabecalho1/>
      <BackButton />

      <section id="sobre" className="sobre">
        <h2>Sobre</h2>
        <p>O <b>Amigos de Patas</b> é uma organização dedicada a resgatar, cuidar e encontrar lares amorosos para cães abandonados ou em situação de risco.</p>
        <p>Acreditamos que todo cachorro merece uma segunda chance e uma vida cheia de carinho, segurança e respeito.</p>
        <p>Nosso trabalho é feito com o apoio de voluntários, doadores e parceiros que compartilham o mesmo amor pelos animais. Aqui, cada latido conta uma história, e cada adoção representa um novo começo.</p>
        <p>Além do resgate e adoção, também promovemos campanhas de conscientização, castração e arrecadação de alimentos, buscando construir uma comunidade mais empática e responsável com os animais.</p>
        <p><b>Venha fazer parte dessa causa — adote, apadrinhe ou contribua!</b></p>
      </section>

      <section id="suporte" className="suporte">
        <h2>Suporte e Sugestões</h2>
        <div className="suporte-content">
          <div className="suporte-info">
            <h3>Como funciona o Chat de Suporte?</h3>
            <p>O chat de suporte permite que você envie suas dúvidas, sugestões e comentários diretamente para nossa equipe administrativa.</p>
            <p><strong>Benefícios de um site como o Amigos de Patas:</strong></p>
            <ul>
              <li><strong>Conexão direta:</strong> Facilita o contato entre pessoas que querem adotar e ONGs que precisam de ajuda</li>
              <li><strong>Transparência:</strong> Todas as informações dos animais são verificadas pelas ONGs parceiras</li>
              <li><strong>Comunidade ativa:</strong> Usuários podem compartilhar experiências e ajudar uns aos outros</li>
              <li><strong>Impacto social:</strong> Contribui para reduzir o número de animais abandonados</li>
              <li><strong>Educação:</strong> Promove a conscientização sobre responsabilidade animal</li>
            </ul>
            <p>Suas sugestões são muito importantes para melhorarmos continuamente nossa plataforma!</p>
          </div>

          <div className="suporte-form">
            <h3>Envie sua mensagem</h3>
            <form onSubmit={enviarMensagemSuporte}>
              <textarea
                value={mensagemSuporte}
                onChange={(e) => setMensagemSuporte(e.target.value)}
                placeholder="Digite sua dúvida, sugestão ou comentário..."
                rows="5"
                required
              />
              <button type="submit" disabled={enviando}>
                {enviando ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
            {mensagemEnviada && (
              <div className="mensagem-sucesso">
                Mensagem enviada com sucesso! Obrigado pelo feedback.
              </div>
            )}
          </div>
        </div>
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

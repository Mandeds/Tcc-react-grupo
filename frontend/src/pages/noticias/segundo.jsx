import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cabecalho1 from '../../component/cabecalho1/cabecalho1';
import './segundo.scss';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  const NEWSAPI_KEY = 'add179e5aa414dcaae30364ebaa3af94';
  const THENEWSAPI_KEY = 'sVFuyDRDxD3kzWLM09wtSL5fdUjvBpC4KjNciBqo';
  const NEWSDATA_KEY = 'pub_1c63891874604019a5243c84e6254949';

  const apis = [
    {
      nome: 'NewsAPI',
      url: `https://newsapi.org/v2/everything?q=pet+animal+adoption&language=pt&sortBy=publishedAt&apiKey=${NEWSAPI_KEY}`
    },
    {
      nome: 'TheNewsAPI',
      url: `https://api.thenewsapi.com/v1/news/all?api_token=${THENEWSAPI_KEY}&language=pt&search=pet+animal+adoção`
    },
    {
      nome: 'NewsData.io',
      url: `https://newsdata.io/api/1/news?apikey=${NEWSDATA_KEY}&q=pet+animal+hospital+adoção&language=pt`
    }
  ];

  useEffect(() => {
    buscarNoticias();
  }, []);

  const buscarNoticias = async () => {
    setLoading(true);
    setErro('');

    try {
      // Busca todas as APIs em paralelo
      const respostas = await Promise.allSettled(
        apis.map(api => axios.get(api.url))
      );

      // Filtra apenas as respostas que deram certo
      const resultadosValidos = respostas
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => formatarNoticias(r.value.data));

      // Remove duplicadas (por título)
      const unicas = Array.from(new Map(resultadosValidos.map(n => [n.titulo, n])).values());

      setNoticias(unicas);
    } catch (err) {
      console.error('Erro ao buscar notícias:', err);
      setErro('Erro ao carregar notícias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  // === Padroniza o formato vindo de cada API ===
  const formatarNoticias = (dados) => {
    if (dados.articles) {
      // NewsAPI
      return dados.articles.map(n => ({
        titulo: n.title,
        descricao: n.description,
        imagem: n.urlToImage,
        data: n.publishedAt,
        fonte: n.source?.name || 'NewsAPI',
        url: n.url
      }));
    } else if (dados.data) {
      // TheNewsAPI
      return dados.data.map(n => ({
        titulo: n.title,
        descricao: n.description,
        imagem: n.image_url,
        data: n.published_at,
        fonte: n.source || 'TheNewsAPI',
        url: n.url
      }));
    } else if (dados.results) {
      // NewsData.io
      return dados.results.map(n => ({
        titulo: n.title,
        descricao: n.description,
        imagem: n.image_url,
        data: n.pubDate,
        fonte: n.source_id || 'NewsData.io',
        url: n.link
      }));
    }
    return [];
  };

  if (loading) {
    return (
      <div className="noticias-container">
        <p>Carregando notícias...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="noticias-container">
        <p>{erro}</p>
        <button onClick={buscarNoticias}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div className="noticias-container">
      <Cabecalho1 />
      <h1>Notícias do Mundo Pet </h1>

      <div className="noticias-grid">
        {noticias.map((noticia, i) => (
          <article key={i} className="noticia-card">
            <img
              src={noticia.imagem || 'https://via.placeholder.com/400x250?text=Pet+News'}
              alt={noticia.titulo}
            />
            <h3>{noticia.titulo}</h3>
            <p>{noticia.descricao}</p>
            <small>{noticia.fonte} • {new Date(noticia.data).toLocaleDateString('pt-BR')}</small>
            <a href={noticia.url} target="_blank" rel="noopener noreferrer">Ler mais</a>
          </article>
        ))}
      </div>
    </div>
  );
}

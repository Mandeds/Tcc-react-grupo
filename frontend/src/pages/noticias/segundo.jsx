import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './segundo.scss';
import Cabecalho1 from "../../component/cabecalho1/cabecalho1";

export default function Noticias() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categoria, setCategoria] = useState('todos');

    
    const API_KEY = "add179e5aa414dcaae30364ebaa3af94";
    const API_URL = `https://newsapi.org/v2/everything?q=(pet OR animal OR dog OR cat OR adoption) AND (Brazil OR Brasil)&language=pt&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`;

    useEffect(() => {
        buscarNoticias();
    }, [categoria]);

    async function buscarNoticias() {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(API_URL);
            const data = await response.json();

            if (data.status === 'ok' && data.articles) {
                const noticiasFormatadas = data.articles.map((article, index) => ({
                    id: index + 1,
                    titulo: article.title || 'Título não disponível',
                    descricao: article.description || 'Descrição não disponível',
                    imagem: article.urlToImage || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400',
                    data: article.publishedAt ? new Date(article.publishedAt).toISOString().split('T')[0] : '2024-01-01',
                    fonte: article.source?.name || 'Fonte desconhecida',
                    categoria: determinarCategoria(article.title + ' ' + article.description),
                    url: article.url || '#'
                }));

                const noticiasFiltradas = categoria === 'todos'
                    ? noticiasFormatadas
                    : noticiasFormatadas.filter(noticia => noticia.categoria === categoria);

                setNoticias(noticiasFiltradas);
            } else {
                console.warn("API não retornou dados válidos, usando mock.");
                usarDadosMock();
            }
        } catch (err) {
            console.error("Erro ao buscar notícias:", err);
            usarDadosMock();
            setError("Erro ao carregar notícias. Mostrando dados locais.");
        } finally {
            setLoading(false);
        }
    }

    function determinarCategoria(texto) {
        const textoLower = texto.toLowerCase();
        if (textoLower.includes('adoção') || textoLower.includes('adoption')) return 'adoção';
        if (textoLower.includes('lei') || textoLower.includes('protec') || textoLower.includes('legislação')) return 'legislação';
        if (textoLower.includes('feira') || textoLower.includes('evento') || textoLower.includes('campanha')) return 'eventos';
        if (textoLower.includes('cuidad') || textoLower.includes('dica') || textoLower.includes('verão') || textoLower.includes('inverno')) return 'cuidados';
        if (textoLower.includes('resgat') || textoLower.includes('salv') || textoLower.includes('maus-tratos')) return 'resgate';
        if (textoLower.includes('saúde') || textoLower.includes('terapia') || textoLower.includes('idoso')) return 'saúde';
        return 'adoção';
    }

    function usarDadosMock() {
        const noticiasMock = [
            {
                id: 1,
                titulo: "Campanha de Adoção de Animais Atinge Recorde em São Paulo",
                descricao: "Mais de 500 animais encontraram lares amorosos na última campanha de adoção realizada na capital paulista.",
                imagem: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400",
                data: "2024-01-15",
                fonte: "Pet News Brasil",
                categoria: "adoção",
                url: "#"
            },
            {
                id: 2,
                titulo: "Novas Leis de Proteção Animal Entram em Vigor",
                descricao: "Legislação amplia direitos dos animais e aumenta penalidades para maus-tratos.",
                imagem: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400",
                data: "2024-01-14",
                fonte: "Jornal Animal",
                categoria: "legislação",
                url: "#"
            },
            {
                id: 3,
                titulo: "Feira de Adoção Gratuita no Parque Ibirapuera",
                descricao: "Evento reunirá dezenas de ONGs com animais para adoção neste final de semana.",
                imagem: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
                data: "2024-01-13",
                fonte: "Adote Pet",
                categoria: "eventos",
                url: "#"
            }
        ];

        const noticiasFiltradas = categoria === 'todos'
            ? noticiasMock
            : noticiasMock.filter(noticia => noticia.categoria === categoria);

        setNoticias(noticiasFiltradas);
    }

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    }

    const categorias = [
        { id: 'todos', nome: 'Todas as Notícias' },
        { id: 'adoção', nome: 'Adoção' },
        { id: 'eventos', nome: 'Eventos' },
        { id: 'legislação', nome: 'Legislação' },
        { id: 'cuidados', nome: 'Cuidados' },
        { id: 'resgate', nome: 'Resgate' },
        { id: 'saúde', nome: 'Saúde' }
    ];

    if (loading) {
        return (
            <div className="noticias-container">
                <div className="noticias-loading">
                    <div className="loading-spinner"></div>
                    <p>Carregando notícias...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="noticias-container">
            <Cabecalho1 />
            
            <div className="noticias-header">
                <h1>Notícias sobre Pets e Adoção</h1>
                <p>Fique por dentro das últimas novidades do mundo animal</p>
            </div>

            <div className="filtros-categorias">
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        className={`filtro-btn ${categoria === cat.id ? 'active' : ''}`}
                        onClick={() => setCategoria(cat.id)}
                    >
                        {cat.nome}
                    </button>
                ))}
            </div>

            {error && (
                <div className="noticias-error">
                    <p>{error}</p>
                    <button onClick={buscarNoticias} className="retry-btn">
                        Tentar Novamente
                    </button>
                </div>
            )}

            <div className="noticias-grid">
                {noticias.map(noticia => (
                    <article key={noticia.id} className="noticia-card">
                        <div className="noticia-imagem">
                            <img 
                                src={noticia.imagem} 
                                alt={noticia.titulo}
                                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400'}
                            />
                            <span className="noticia-categoria">{noticia.categoria}</span>
                        </div>
                        
                        <div className="noticia-conteudo">
                            <h3>{noticia.titulo}</h3>
                            <p>{noticia.descricao}</p>
                            <div className="noticia-meta">
                                <span>{noticia.fonte}</span>
                                <span>{formatarData(noticia.data)}</span>
                            </div>
                            <a href={noticia.url} id='link' target="_blank" rel="noopener noreferrer">
                                Ler Mais →
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            {noticias.length === 0 && !loading && !error && (
                <div className="noticias-vazias">
                    <p>Nenhuma notícia encontrada para esta categoria.</p>
                </div>
            )}
        </div>
    );
}

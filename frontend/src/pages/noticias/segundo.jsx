import { Link } from "react-router"
import React, { useState, useEffect } from 'react';
import './segundo.scss';
import Cabecalho1 from "../../component/cabecalho1/cabecalho1";


export default function Noticias() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categoria, setCategoria] = useState('todos');

    // API gratuita para notícias sobre pets
    const API_URL = 'https://newsapi.org/v2/everything?q=(pet OR animal OR dog OR cat OR adoption) AND (Brazil OR Brasil)&language=pt&sortBy=publishedAt&pageSize=20&apiKey=9d8c8b8b8b8b8b8b8b8b8b8b8b8b8b8b';

    useEffect(() => {
        buscarNoticias();
    }, [categoria]);

    const buscarNoticias = async () => {
        try {
            setLoading(true);
            setError('');

            // Tentar buscar da API real
            try {
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
                    throw new Error('API não retornou dados válidos');
                }
            } catch (apiError) {
                console.warn('Erro na API, usando dados mock:', apiError);
                // Fallback para dados mock se a API falhar
                usarDadosMock();
            }

        } catch (err) {
            setError('Erro ao carregar notícias. Tente novamente mais tarde.');
            console.error('Erro geral:', err);
        } finally {
            setLoading(false);
        }
    };

    const determinarCategoria = (texto) => {
        const textoLower = texto.toLowerCase();
        if (textoLower.includes('adoção') || textoLower.includes('adoption')) return 'adoção';
        if (textoLower.includes('lei') || textoLower.includes('protec') || textoLower.includes('legislação')) return 'legislação';
        if (textoLower.includes('feira') || textoLower.includes('evento') || textoLower.includes('campanha')) return 'eventos';
        if (textoLower.includes('cuidad') || textoLower.includes('dica') || textoLower.includes('verão') || textoLower.includes('inverno')) return 'cuidados';
        if (textoLower.includes('resgat') || textoLower.includes('salv') || textoLower.includes('maus-tratos')) return 'resgate';
        if (textoLower.includes('saúde') || textoLower.includes('terapia') || textoLower.includes('idoso')) return 'saúde';
        return 'adoção'; // categoria padrão
    };

    const usarDadosMock = () => {
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
            },
            {
                id: 4,
                titulo: "Dicas para Cuidar de Filhotes no Verão",
                descricao: "Especialistas compartilham cuidados essenciais com pets durante os dias mais quentes.",
                imagem: "https://images.unsplash.com/photo-1558322397-18755507ee1b?w=400",
                data: "2024-01-12",
                fonte: "Guia Pet",
                categoria: "cuidados",
                url: "#"
            },
            {
                id: 5,
                titulo: "ONG Resgata 50 Cães de Situação de Maus-Tratos",
                descricao: "Operação conjunta entre protetores e autoridades salvou animais em situação de risco.",
                imagem: "https://images.unsplash.com/photo-1551336367-7a6a0c0d5393?w=400",
                data: "2024-01-11",
                fonte: "Resgate Animal",
                categoria: "resgate",
                url: "#"
            },
            {
                id: 6,
                titulo: "Benefícios da Terapia com Animais para Idosos",
                descricao: "Estudo comprova melhora significativa na qualidade de vida com a companhia de pets.",
                imagem: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
                data: "2024-01-10",
                fonte: "Saúde Pet",
                categoria: "saúde",
                url: "#"
            }
        ];

        const noticiasFiltradas = categoria === 'todos'
            ? noticiasMock
            : noticiasMock.filter(noticia => noticia.categoria === categoria);

        setNoticias(noticiasFiltradas);
    };

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    };

    const categorias = [
        { id: 'todos', nome: ' Todas as Notícias' },
        { id: 'adoção', nome: ' Adoção' },
        { id: 'eventos', nome: ' Eventos' },
        { id: 'legislação', nome: ' Legislação' },
        { id: 'cuidados', nome: ' Cuidados' },
        { id: 'resgate', nome: ' Resgate' },
        { id: 'saúde', nome: ' Saúde' }
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
            <Cabecalho1/>
            
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
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400';
                                }}
                            />
                            <span className="noticia-categoria">{noticia.categoria}</span>
                        </div>
                        
                        <div className="noticia-conteudo">
                            <h3 className="noticia-titulo">{noticia.titulo}</h3>
                            <p className="noticia-descricao">{noticia.descricao}</p>
                            
                            <div className="noticia-meta">
                                <span className="noticia-fonte">{noticia.fonte}</span>
                                <span className="noticia-data">{formatarData(noticia.data)}</span>
                            </div>
                            
                            <a 
                                href={noticia.url} 
                                className="noticia-link"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
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
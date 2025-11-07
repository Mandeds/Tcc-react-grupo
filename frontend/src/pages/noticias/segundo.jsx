import { Link } from "react-router"
import React, { useState, useEffect } from 'react';
import './segundo.scss';
import Cabecalho1 from "../../component/cabecalho1/cabecalho1";


export default function Noticias() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categoria, setCategoria] = useState('todos');

    // API Key - você pode conseguir uma gratuita em newsapi.org ou usar outra API
    const API_KEY = 'sua_api_key_aqui';
    const API_URL = `https://newsapi.org/v2/everything?q=pet+animal+adoption&language=pt&apiKey=${API_KEY}`;

    // API alternativa (sem necessidade de key)
    const API_ALTERNATIVA = 'https://newsapi.org/v2/everything?q=(pet OR animal OR adoption) AND (brazil OR brasil)&language=pt&sortBy=publishedAt&pageSize=20';

    useEffect(() => {
        buscarNoticias();
    }, [categoria]);

    const buscarNoticias = async () => {
        try {
            setLoading(true);
            setError('');

            // Simulação de dados - substitua pela sua API real
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

            // Filtra por categoria se não for "todos"
            const noticiasFiltradas = categoria === 'todos' 
                ? noticiasMock 
                : noticiasMock.filter(noticia => noticia.categoria === categoria);

            setNoticias(noticiasFiltradas);
            
            // Simular delay de carregamento
            setTimeout(() => {
                setLoading(false);
            }, 1000);

        } catch (err) {
            setError('Erro ao carregar notícias. Tente novamente mais tarde.');
            setLoading(false);
            console.error('Erro na API:', err);
        }
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
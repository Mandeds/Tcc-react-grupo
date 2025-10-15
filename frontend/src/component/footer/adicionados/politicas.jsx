import React from "react";
import { Link } from "react-router-dom";
import "./politica.scss"; // ou o nome do seu arquivo CSS

export default function Politica() {
    return (
        <div className="politica-container">
            <div className="politica-header">
                <h1>Termos e Políticas do Laços e Patas</h1>
                <p className="last-update">Última atualização: 03 de outubro de 2025</p>
            </div>

            <div className="politica-content">
                <section className="politica-section">
                    <h1>1. Política de Privacidade</h1>

                    <h2>1.1 Quem Somos</h2>
                    <p>O Laços e Patas é uma plataforma dedicada a ajudar animais a encontrar um lar ou retornar às suas famílias.</p>
                    <div className="highlight-box">
                        <ul>
                            <li><strong>Nome do projeto:</strong> Laços e Patas</li>
                            <li><strong>Localização:</strong> Embu Guaçu – São Paulo – Brasil</li>
                            <li><strong>Contato:</strong> lacosepatas.oficial@gmail.com</li>
                        </ul>
                    </div>

                    <h2>1.2 Dados que Coletamos</h2>
                    <ul>
                        <li><strong>Dados fornecidos pelo usuário:</strong> nome, e-mail, fotos de animais, localização (quando compartilhada voluntariamente), informações sobre adoção ou doação.</li>
                        <li><strong>Dados de uso:</strong> endereço IP, logs de acesso, informações do dispositivo.</li>
                        <li><strong>Dados de terceiros:</strong> informações de serviços de login externos, como Google.</li>
                    </ul>

                    <h2>1.3 Finalidade do Uso dos Dados</h2>
                    <ul>
                        <li>Criar e gerenciar contas de usuários.</li>
                        <li>Exibir postagens e perfis de animais para adoção.</li>
                        <li>Facilitar reencontros ou adoções por meio do compartilhamento de localização.</li>
                        <li>Auxiliar na comunicação entre usuários interessados em adoção ou doação.</li>
                        <li>Melhorar a experiência do usuário e a segurança da plataforma.</li>
                    </ul>

                    <h2>1.4 Compartilhamento de Dados</h2>
                    <ul>
                        <li>Utilizamos serviços de hospedagem e envio de e-mails (Google e parceiros contratados).</li>
                        <li>Empregamos provedores de inteligência artificial (como Gemini e DeepSeek) para funcionalidades da plataforma.</li>
                        <li>Não vendemos informações a terceiros.</li>
                        <li>Todos os dados são armazenados no Brasil.</li>
                    </ul>

                    <h2>1.5 Menores de Idade</h2>
                    <p>Usuários menores de 18 anos devem utilizar a plataforma apenas com autorização e supervisão de seus responsáveis legais.</p>

                    <h2>1.6 Direitos dos Titulares (LGPD)</h2>
                    <p>Você pode, a qualquer momento:</p>
                    <ul>
                        <li>Solicitar acesso, correção ou exclusão de seus dados.</li>
                        <li>Revogar consentimentos previamente concedidos.</li>
                        <li>Solicitar a portabilidade de suas informações.</li>
                    </ul>
                    <div className="contact-info">
                        <p>Para exercer esses direitos, entre em contato pelo e-mail: <strong>lacosepatas.oficial@gmail.com</strong></p>
                    </div>

                    <h2>1.7 Retenção de Dados</h2>
                    <p>Seus dados pessoais serão mantidos enquanto sua conta estiver ativa. Após a exclusão da conta, os dados podem ser armazenados em backup por até 6 meses por motivos de segurança e prevenção de fraudes.</p>

                    <h2>1.8 Segurança</h2>
                    <p>Adotamos criptografia e boas práticas de segurança para proteger seus dados. No entanto, nenhum sistema é completamente invulnerável.</p>

                    <h2>1.9 Alterações na Política</h2>
                    <p>Esta política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível em nosso site, com a data da última atualização.</p>

                    <h2>1.10 Contato do Encarregado (DPO)</h2>
                    <div className="contact-info">
                        <p>E-mail: <strong>lacosepatas.oficial@gmail.com</strong></p>
                    </div>
                </section>

                <section className="politica-section">
                    <h1>2. Termos de Uso</h1>

                    <h2>2.1 Aceitação dos Termos</h2>
                    <p>Ao utilizar o Laços e Patas, você concorda com estes Termos de Uso.</p>

                    <h2>2.2 Uso da Plataforma</h2>
                    <ul>
                        <li>O Laços e Patas destina-se exclusivamente a promover adoções, reencontros e denúncias relacionadas ao bem-estar animal.</li>
                        <li>É estritamente proibido utilizar a plataforma para compra e venda de animais.</li>
                    </ul>

                    <h2>2.3 Responsabilidade do Usuário</h2>
                    <ul>
                        <li>O usuário deve fornecer informações verdadeiras e atualizadas.</li>
                        <li>O usuário é integralmente responsável pelo conteúdo que publica (fotos, descrições, localização).</li>
                        <li>Menores de idade devem utilizar a plataforma apenas com consentimento e supervisão de seus responsáveis legais.</li>
                    </ul>

                    <h2>2.4 Conteúdo Proibido</h2>
                    <div className="prohibited-box">
                        <p>Não é permitido:</p>
                        <ul>
                            <li>Discurso de ódio, assédio ou ofensas.</li>
                            <li>Conteúdo explícito ou impróprio.</li>
                            <li>Desrespeito à causa animal.</li>
                            <li>Anúncios de comércio ou exploração de animais.</li>
                        </ul>
                    </div>

                    <h2>2.5 Moderação</h2>
                    <ul>
                        <li>O Laços e Patas reserva-se o direito de remover conteúdos que violem estes termos.</li>
                        <li>Usuários podem denunciar conteúdos impróprios ou casos de maus-tratos observados.</li>
                    </ul>

                    <h2>2.6 Limitação de Responsabilidade</h2>
                    <p>A plataforma é fornecida "no estado em que se encontra", sem garantias adicionais. Não nos responsabilizamos por contatos, acordos ou adoções realizadas entre usuários.</p>

                    <h2>2.7 Encerramento de Conta</h2>
                    <p>O usuário pode excluir sua conta a qualquer momento.</p>

                    <h2>2.8 Alterações nos Termos</h2>
                    <p>Estes termos podem ser modificados. A versão mais recente estará sempre disponível em nosso site.</p>
                </section>

                <section className="politica-section">
                    <h1>3. Diretrizes da Comunidade</h1>

                    <h2>3.1 Princípios da Comunidade</h2>
                    <p>No Laços e Patas, valorizamos o respeito, a empatia e a proteção aos animais. Para manter um ambiente seguro, solicitamos que todos sigam estas regras:</p>

                    <h2>3.2 Permitido</h2>
                    <div className="allowed-box">
                        <ul>
                            <li>Publicar fotos e informações de animais para adoção.</li>
                            <li>Compartilhar localização para auxiliar no reencontro de animais perdidos.</li>
                            <li>Relatar casos de maus-tratos de forma responsável.</li>
                        </ul>
                    </div>

                    <h2>3.3 Não Permitido</h2>
                    <div className="prohibited-box">
                        <ul>
                            <li>Discurso de ódio, discriminação ou assédio.</li>
                            <li>Conteúdo explícito, violento ou que desrespeite a causa animal.</li>
                            <li>Venda, compra ou exploração de animais.</li>
                        </ul>
                    </div>

                    <h2>3.4 Sistema de Denúncias</h2>
                    <ul>
                        <li>Cada postagem ou perfil possui um botão de denúncia.</li>
                        <li>Denúncias podem incluir casos de maus-tratos observados dentro ou fora da plataforma.</li>
                        <li>Conteúdos denunciados serão analisados pela nossa equipe.</li>
                    </ul>
                </section>

                <div className="contact-footer">
                    <p><strong>Caso tenha dúvidas ou necessite de suporte, entre em contato conosco:</strong></p>
                    <p className="contact-email">lacosepatas.oficial@gmail.com</p>
                </div>
            </div>
        </div>
    );
}
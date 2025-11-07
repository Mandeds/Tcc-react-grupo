# TODO: Grandes Melhorias no Sistema

## Tarefas Pendentes
- [x] Implementar página de pesquisa com filtros e busca
- [x] Redesenhar página de navegação com sidebar
- [x] Melhorar página de notícias com API real e fallback
- [x] Ajustar sidebar: manter "Criar Post" com sinal de cruz (X)
- [x] Chat: adicionar botão para pesquisa/adicionar usuário quando não há contatos
- [ ] Adicionar botões de voltar nas páginas necessárias
- [ ] Redesenhar navegação: estrutura Instagram (post central + chat lateral)
- [ ] Implementar sistema de likes com contagem de corações
- [ ] Reorganizar sidebar: botões do outro lado + ícone com foto do usuário
- [ ] Criar página de perfil com edição (foto, nome, bio)
- [ ] Permitir deletar posts próprios
- [ ] Conectar ícone de perfil na navegação
- [ ] Remover emojis e comentários do projeto
- [ ] Remover botão de denúncias da página inicial
- [ ] Criar caixa de mensagens no admin para denúncias
- [ ] Atualizar footer com nova estilização
- [ ] Adicionar identificação de status do pet (rosa=perdido, amarelo=adoção)
- [ ] Testar todas as funcionalidades implementadas

## Novos Arquivos Necessários
- frontend/src/pages/perfil/perfil.jsx
- frontend/src/pages/perfil/perfil.scss
- frontend/src/component/backButton/backButton.jsx
- frontend/src/component/backButton/backButton.scss
- frontend/src/component/likeButton/likeButton.jsx
- frontend/src/component/likeButton/likeButton.scss
- frontend/src/component/petStatus/petStatus.jsx
- frontend/src/component/petStatus/petStatus.scss

## Arquivos a Modificar
- frontend/src/pages/nav2/navegarPost/naveg.jsx (estrutura Instagram)
- frontend/src/pages/nav2/chat/chat.jsx (integração lateral)
- frontend/src/pages/inicio/inicio.jsx (remover denúncias)
- frontend/src/pages/admin/admin.jsx (caixa de mensagens)
- frontend/src/component/footer/footer.scss (nova estilização)
- backend: adicionar endpoints para likes, perfil, denúncias

## Próximos Passos
- Implementar botões de voltar
- Redesenhar navegação estilo Instagram
- Criar sistema de likes
- Implementar página de perfil
- Atualizar estilização geral
- Testar integração completa

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api.js";
import "./chat.scss";

const IconPerson = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

function Header({ onBack }) {
  return (
    <header className="Header">
      <button className="btn-voltar" onClick={onBack}>⬅ Voltar</button>
      <div className="menu-icon">☰</div>
    </header>
  );
}


function ChatItem({ user, onSelectChat, isActive, onProfileClick }) {
  const itemClass = `ChatItem ${isActive ? "active" : ""}`;

  const handleIconClick = (e) => {
    e.stopPropagation();
    onProfileClick(user.id);
  };

  return (
    
    <div className={itemClass} onClick={() => onSelectChat(user.id)}>
      <div className="chat-icon" onClick={handleIconClick}>
        {user.profilePic ? (
          <img src={user.profilePic} alt={user.name} />
        ) : (
          <IconPerson />
        )}
      </div>
      <div className="chat-info">
        <strong>{user.name}</strong>
        <span>{user.snippet || "Clique para conversar"}</span>
      </div>
    </div>
  );
}

function ChatSidebar({ users, onSelectChat, activeChatId, onProfileClick }) {
  return (
    <aside className="ChatSidebar">
      {users.map((user) => (
        <ChatItem
          key={user.id}
          user={user}
          onSelectChat={onSelectChat}
          isActive={user.id === activeChatId}
          onProfileClick={onProfileClick}
        />
      ))}
    </aside>
  );
}

function MainFeed({
  messages,
  currentMessage,
  onMessageChange,
  onSendMessage,
  activeChatId,
}) {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!activeChatId) {
    return (
      <main className="MainFeed">
        <div className="no-chat-selected">
          Selecione uma conversa ou adicione um novo contato.
        </div>
      </main>
    );
  }

  return (
    <main className="MainFeed">
      <div className="message-list">
        {messages.map((msg) => (
          <div
            key={msg.id_mensagem || msg.id}
            className={`message ${msg.id_remetente === 1 ? "sent" : ""}`}
          >
            {msg.mensagem || msg.text}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <form className="message-input-area" onSubmit={onSendMessage}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={currentMessage}
          onChange={onMessageChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </main>
  );
}

function RightSidebar({ mainUser, onProfileClick }) {
  return (
    <aside className="RightSidebar">
      <div className="profile-placeholder" onClick={() => onProfileClick("me")}>
        {mainUser.profilePic ? (
          <img src={mainUser.profilePic} alt={mainUser.name} />
        ) : (
          <IconPerson />
        )}
      </div>
      <nav className="main-nav">
        <button className="nav-button">Início</button>
        <button className="nav-button">Pesquisa</button>
        <button className="nav-button">Notificações</button>
      </nav>
    </aside>
  );
}

function Footer({ onAddUser }) {
  return (
    <footer className="Footer">
      <div className="add-post-icon" onClick={onAddUser}>
        +
      </div>
    </footer>
  );
}

function UploadModal({ onClose, onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      onUpload(file);
    } else {
      alert("Por favor, selecione um arquivo de imagem.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className="upload-modal-backdrop" onClick={onClose}>
      <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Alterar Foto de Perfil</h3>
        <div
          className={`drop-zone ${isDragging ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          Arraste e solte uma imagem aqui ou clique para selecionar
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Voltar</button>
        </div>
      </div>
    </div>
  );
}

function Chat() {
  const [mainUser, setMainUser] = useState({
    id: 1, // usuário logado
    name: "Você",
    profilePic: null,
  });
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState({});
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    userIdToUpdate: null,
  });

  // 🔹 Carregar contatos
  useEffect(() => {
    async function carregarContatos() {
      try {
        const resp = await api.get(`/chat/contatos/${mainUser.id}`);
        setUsers(resp.data);
      } catch (err) {
        console.error("Erro ao buscar contatos:", err);
      }
    }
    carregarContatos();
  }, [mainUser.id]);

  // 🔹 Carregar mensagens ao selecionar contato
  const handleSelectChat = async (id) => {
    setActiveChatId(id);
    try {
      const resp = await api.get(`/chat/${mainUser.id}/${id}`);
      setAllMessages((prev) => ({
        ...prev,
        [id]: resp.data,
      }));
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    }
  };

  // 🔹 Enviar mensagem
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() === "" || !activeChatId) return;

    try {
      await api.post("/chat/mensagem", {
        id_remetente: mainUser.id,
        id_destinatario: activeChatId,
        mensagem: currentMessage,
      });

      // Atualiza mensagens localmente
      setAllMessages((prev) => {
        const currentChat = prev[activeChatId] || [];
        return {
          ...prev,
          [activeChatId]: [
            ...currentChat,
            {
              id: Date.now(),
              mensagem: currentMessage,
              id_remetente: mainUser.id,
            },
          ],
        };
      });

      setCurrentMessage("");
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  const handleMessageChange = (e) => setCurrentMessage(e.target.value);
  const handleOpenUploadModal = (id) => setModalState({ isOpen: true, userIdToUpdate: id });
  const handleCloseUploadModal = () => setModalState({ isOpen: false, userIdToUpdate: null });
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (modalState.userIdToUpdate === "me") {
        setMainUser((p) => ({ ...p, profilePic: dataUrl }));
      } else {
        setUsers((p) =>
          p.map((u) =>
            u.id === modalState.userIdToUpdate ? { ...u, profilePic: dataUrl } : u
          )
        );
      }
    };
    reader.readAsDataURL(file);
    handleCloseUploadModal();
  };

  const activeChatMessages = allMessages[activeChatId] || [];

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <ChatSidebar
          users={users}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
          onProfileClick={handleOpenUploadModal}
        />
        <MainFeed
          messages={activeChatMessages}
          currentMessage={currentMessage}
          onMessageChange={handleMessageChange}
          onSendMessage={handleSendMessage}
          activeChatId={activeChatId}
        />
        <RightSidebar mainUser={mainUser} onProfileClick={handleOpenUploadModal} />
      </div>
      <Footer onAddUser={() => alert("Adicionar usuário não implementado ainda")} />

      {modalState.isOpen && (
        <UploadModal onClose={handleCloseUploadModal} onUpload={handleImageUpload} />
      )}
    </div>
  );
}

export default Chat;

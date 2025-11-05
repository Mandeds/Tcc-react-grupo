import "./Naveg.scss"
import user from "/images/user.png"
import { Link } from "react-router";
import logo from "/logo_tcc.png 1.png"
import CabecalhoNav from "../../../component/cabecalhonav/cabecalhonav";
import ChatItem from "../../nav2/chat/chat"

export default function Naveg (){

    return(
        <>
         <CabecalhoNav/>
            <div className="cabecalho_nav">
                <img src={logo} alt="menu" id="menu_hamburguer" width={110}/>
                <button id="opcao1">Opção1</button>
                <button id="opcao2">Opção2</button>
                <img src={user} alt="usuario" id="img_usuario" width={100}/>
            </div>

            <div className="container_navegacao"> 




            <div className="mensagens">
            </div>

            <div className="perfil_direita">
                <button className="h2_mensagens">Inicio</button>
                <Link to = "/pesquisa" className = "h2_mensagens">Pesquisa</Link>
                <Link to="/chat" className = "h2_mensagens" >Chat</Link>
            </div>       


            </div>
        </>
    )
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
import { Link } from "react-router-dom";
import "./Naveg.scss"
import user from "/images/user.png"
import gato from "/images/imagem_gato.png"
import menu from "/images/menuHamburguer.png"
import CabecalhoNav from "../../../component/cabecalhonav/cabecalhonav";

export default function Naveg (){

    return(
        <>
         <CabecalhoNav/>
            <div className="cabecalho_nav">
                <img src={menu} alt="menu" id="menu_hamburguer" width={55}/>

                <p className="opcao">Opção1</p>
                <p className="opcao">Opção2</p>
                <img src={user} alt="usuario" id="img_usuario" width={100}/>
            </div>

            <div className="container_navegacao"> 

            <div className="perfil_esquerda">
            <h1>Hello word</h1>
            </div>


            <div className="mensagens">
            </div>

            <div className="perfil_direita">
                <h2 className="h2_mensagens">Inicio</h2>
                <h2 className="h2_mensagens">Pesquisa</h2>
                <h2 className="h2_mensagens">Notificações</h2>
            </div>

            </div>
        </>
    )
}
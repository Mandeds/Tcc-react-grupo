import { Link } from "react-router-dom";
import "./Naveg.scss"
import user from "/images/user.png"
import CabecalhoNav from "../../../component/cabecalhonav/cabecalhonav";

export default function Naveg (){

    return(
        <>
         <CabecalhoNav/>
            <div className="cabecalho_nav">
                <h1>Hello word</h1>
            </div>

            <div className="container_navegacao"> 

            <div className="perfil_esquerda">
            <h1>Hello word</h1>
            </div>


            <div className="mensagens">
            <h1>Hello word</h1>
            </div>

            <div className="perfil_direita">
                <img src={user} alt="usuario" id="img_usuario" width={80}/>
                <h2 className="h2_mensagens">Inicio</h2>
                <h2 className="h2_mensagens">Pesquisa</h2>
                <h2 className="h2_mensagens">Notificações</h2>
            </div>

            </div>
        </>
    )
}
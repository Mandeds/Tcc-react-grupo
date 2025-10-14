import "./cabecalho1.scss"
import { Link } from "react-router-dom";

export default function (){

    return(
        <>
        <header className="Inicio_header">
        <img src="src/assets/images/logo.png" alt="Logo" />
         <Link>Inicio</Link>
         <Link>Sobre</Link>
         <Link to="/segundo" >Noticias</Link>
         <Link>Denuncie</Link>        

         <Link to="/login"> Login </Link>
         <Link to="/cadastro">Cadastro</Link>
         </header>
        </>
    )
}
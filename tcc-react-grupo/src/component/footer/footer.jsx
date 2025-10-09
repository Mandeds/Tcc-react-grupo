import { Link } from "react-router-dom";

export default function Footer(){
    
    return(
        <>
        <img src="src/assets/images/logo.png" alt="Logo" width="100px" height="100px"/>
        
        <h4>Colaboradores</h4>
        <h4>Suporte</h4> {/* Tem que conectar o gmail do tcc gmail= lacos&patas@gmail.com*/}
        <Link to="/politica">Politicas e Termos</Link>

        </>
    )
}
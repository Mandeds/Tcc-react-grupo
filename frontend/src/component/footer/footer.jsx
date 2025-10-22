import { Link } from "react-router-dom";
import "./footer.scss"


export default function Footer(){
    
    return(
    <div className="Footer">
        
        <div className="descricao">
        <h1>Adote e ganhe um novo amigo</h1>

        <p>
            Os bichinhos precisam de carinho, cuidado e um lar cheio de amor.
            Eles vão retribuir com lambidas, ronrons e muita alegria!
        </p>
        </div>
        
        <div>
        <img src="src/assets/images/logo.png" alt="Logo" width="100px" height="100px"/>
        
        <h4>Colaboradores</h4>
        <h4>Suporte</h4> {/* Tem que conectar o gmail do tcc gmail= lacos&patas@gmail.com*/}
        <Link to="/politica">Politicas</Link> 
        </div>

    </div>    
    )
}
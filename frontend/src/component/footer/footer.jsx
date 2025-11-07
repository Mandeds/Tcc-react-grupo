import { Link } from "react-router-dom";
import "./footer.scss"
import instagram from "./img/instagram.png"
import tiktok from "./img/tikok.png"

export default function Footer(){
    
    return(
        <div className="Footer">
            <div className="informacoes">
                <h1>Adote e ganhe um novo amigo</h1>

                <p>
                    Os bichinhos precisam de carinho, cuidado e um lar cheio de amor.
                    Eles vão retribuir com lambidas, ronrons e muita alegria!
                </p>
                <div className="icon_sociais">
                    <img src={tiktok} alt="Icone_tiktok" width={40} />
                    <img src={instagram} alt="Icone_instagran" width={40} />
                </div>
            </div>            
            <img src="src/assets/images/logo.png" alt="Logo" height={300} id="logo_footer"/> 
        </div>    
    )
}
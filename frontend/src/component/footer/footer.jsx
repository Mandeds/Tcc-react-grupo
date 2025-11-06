import { Link } from "react-router-dom";
import "./footer.scss"
import insta from "/images/insta.png"
import tiktok from "/images/tiktok.png"

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
                <img src={tiktok} alt="Icone_tiktok" width={50} />
                <img src={insta} alt="Icone_instagran" width={50} />
            </div>
        </div>            
            <img src="src/assets/images/logo.png" alt="Logo" width={300} height={300} id="logo_footer"/> 
    </div>    
    )
}
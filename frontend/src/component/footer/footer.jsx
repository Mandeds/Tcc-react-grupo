import { Link } from "react-router-dom";
import "./footer.scss"


export default function Footer(){

    return(
    <div className="Footer">
        <div className="Footer-content">
            <div className="footer-section">
                <img src="src/assets/images/logo.png" alt="Logo" width="100px" height="100px"/>
            </div>

            <div className="footer-section">
                <h3>Colaboradores</h3>
                <p>Conheça nossa equipe dedicada ao bem-estar animal.</p>
            </div>

            <div className="footer-section">
                <h3>Suporte</h3>
                <p>Precisa de ajuda? Entre em contato conosco.</p>
                <p>Email: lacosepatas@gmail.com</p>
            </div>

            <div className="footer-section">
                <h3>Links Úteis</h3>
                <ul className="footer-links">
                    <li><Link to="/politica">Políticas</Link></li>
                    <li><Link to="/sobre">Sobre Nós</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                </ul>
            </div>
        </div>

        <div className="footer-bottom">
            <p>Feito com <span className="heart">amor</span> para os animais</p>
            <p>&copy; 2024 Amigos de Patas. Todos os direitos reservados.</p>
        </div>
    </div>
    )
}

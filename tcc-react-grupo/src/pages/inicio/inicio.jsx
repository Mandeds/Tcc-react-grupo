import React from "react";
import { Link } from "react-router";
import "./inicio.scss"

export default function Inicio() {

    return(
        <>
        <header className="Inicio_header">
        
       <img src="src/assets/images/logo.png" alt="" />
        <Link>Inicio</Link>
        <Link>Sobre</Link>
        <Link to="/segundo" >Noticias</Link>
        <Link>Denuncie</Link>        
        </header>

        <main>
        
            <h1 id="Titu_inicio">Laços & Patas</h1>
            <img src="src/assets/images/imgInicio/im1.png" alt="imagem1" />
            <img src="src/assets/images/imgInicio/im2.png" alt="imagem2" />
            <img src="src/assets/images/imgInicio/im3.png" alt="imagem3" />
            <img src="src/assets/images/imgInicio/imgrandeLado.png" alt="imagem4" />

            <h3>Criando conexões de amor entre pessoas e animais.</h3>

            <img src="src/assets/images/imgInicio/imLadopequeno.png" alt="imagem5" />

        // Segunda parte da primeira pagina

            <h2>POR QUE TER UM ANIMAL?</h2>

            <p>Ter um animal é ter um amigo de verdade. Eles dão carinho, fazem companhia e deixam os dias mais felizes. Adotar é um gesto de amor que muda duas vidas: a sua e a dele.</p>

            </main>       
                
        </>
    )
}
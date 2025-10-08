import React from "react"
import "./inicio.scss"
import Cabecalho1 from "../../component/cabecalho1/cabecalho1";
import Footer from "../../component/footer/footer";

export default function Inicio() {

    return (
        <>

            <Cabecalho1 />

            <main>

                <div className="Primeira_parte">

                    {/* Primeira parte*/}

                    <h1 id="Titu_inicio">Laços & Patas</h1>
                    <img src="src/assets/images/imgInicio/im1.png" alt="imagem1" />
                    <img src="src/assets/images/imgInicio/im2.png" alt="imagem2" />
                    <img src="src/assets/images/imgInicio/im3.png" alt="imagem3" />
                    <img src="src/assets/images/imgInicio/imgrandeLado.png" alt="imagem4" />

                    <h3>Criando conexões de amor entre pessoas e animais.</h3>

                    <img src="src/assets/images/imgInicio/imLadopequeno.png" alt="imagem5" />

                </div>

                <div className="Segunda_Parte">

                    {/* Segunda parte */}

                    <h2>POR QUE TER UM ANIMAL?</h2>

                    <p>Ter um animal é ter um amigo de verdade. Eles dão carinho, fazem companhia e deixam os dias mais felizes. Adotar é um gesto de amor que muda duas vidas: a sua e a dele.</p>

                    <img src="src/assets/images/imgInicio2/pg2_1.png" alt="imagem_segundaparte_1" />
                    <img src="src/assets/images/imgInicio2/pg1_2.png" alt="imagem_segundaparte_2" />
                    <img src="src/assets/images/imgInicio2/pg1_3.png" alt="imagem_segundaparte_3" />
                </div>

                    <h1>OFERTAS LEGAIS</h1>

            </main>

            <Footer />

        </>
    )
}
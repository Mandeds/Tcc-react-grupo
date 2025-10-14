import React from "react"
import "./inicio.scss"
import Cabecalho1 from "../../component/cabecalho1/cabecalho1";
import Footer from "../../component/footer/footer";
import CardD from "../../component/cardDesenho/cardD";


export default function Inicio() {

    return (
        <>

            <Cabecalho1 />

            <main>

                <div className="Primeira_parte">

                    {/* Primeira parte*/}

                    <h1 id="Titu_inicio">Laços & Patas</h1>
                    <img src="src/assets/images/imgInicio/im1.png" alt="imagem1" width={100}  className="imagem_1" />
                    <img src="src/assets/images/imgInicio/im2.png" alt="imagem2" width={100} className="imagem_1"/>
                    <img src="src/assets/images/imgInicio/im3.png" alt="imagem3"  className="imagem_1"/>
                    <img src="src/assets/images/imgInicio/imgrandeLado.png" alt="imagem4" className="imagem_2"/>

                    <h3>Criando conexões de amor entre pessoas e animais.</h3>

                    <img src="src/assets/images/imgInicio/imLadopequeno.png" alt="imagem5" className="imagem_3"/>

                </div>

                <div className="Segunda_Parte">

                    {/* Segunda parte */}

                    <h2>POR QUE TER UM ANIMAL?</h2>

                    <p>Ter um animal é ter um amigo de verdade. Eles dão carinho, fazem companhia e deixam os dias mais felizes. Adotar é um gesto de amor que muda duas vidas: a sua e a dele.</p>
                    <img src="src/assets/images/imgInicio2/pg2_1.png" width={200} alt="imagem_segundaparte_1" className="img2_1" />
                    <img src="src/assets/images/imgInicio2/pg1_2.png" width={200} alt="imagem_segundaparte_2" className="img2_1" />
                    <img src="src/assets/images/imgInicio2/pg1_3.png" width={200} alt="imagem_segundaparte_3" className="img2_1" />
                </div>

                <h1>OFERTAS LEGAIS</h1>

                <CardD

                    images="src/assets/images/imgDesenho1/imgDesenho.png"
                    texto="Ao adotar, você dá uma nova chance para um animalzinho e ainda ganha amor de verdade!"
                />

                <CardD

                    images="src/assets/images/imgDesenho1/imgDesenho2.png"
                    texto="Nossos animaizinhos não têm preço, têm carinho! Adotar é gratuito e muda vidas."
                />

                <CardD

                    images="src/assets/images/imgDesenho1/imgDesenho3.png"
                    texto="Aqui você encontra pets perto de você! Escolha, converse com quem cuida e pronto: adoção sem complicação."
                />

            </main>

            <Footer />

        </>
    )
}
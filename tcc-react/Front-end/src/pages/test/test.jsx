import React from "react";
import { useNavigate } from "react-router-dom";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

export default function Test() {
  const navigate = useNavigate();

  const irParaTeste = () => {
    navigate("/home"); // rota definida no Router
  };

  return (
    <div>
      <button onClick={irParaTeste}>Ir para Home</button>

      <Parallax pages={4}>
        <ParallaxLayer><h2>Bom dia</h2></ParallaxLayer>
        <ParallaxLayer><h2>Boa noite</h2></ParallaxLayer>
      </Parallax>
    </div>
  );
}

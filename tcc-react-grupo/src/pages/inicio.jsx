import React from "react";
import { Link } from "react-router";
import "./inicio.scss"

export default function Inicio() {

    return(
        <div>
            <h1>Oi</h1>

                  <Link to="/segundo" >Segundo</Link>

        </div>
    )
}
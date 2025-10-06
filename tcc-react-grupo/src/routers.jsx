import {BrowserRouter, Routes, Route} from "react-router-dom"

import Inicio from "./pages/inicio.jsx"
import Segundo from "./pages/segundo.jsx"

export default function Navegacao (){

    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Inicio/>} />
            <Route path="/segundo" element={<Segundo/>}/>
        </Routes>
    </BrowserRouter>)

}
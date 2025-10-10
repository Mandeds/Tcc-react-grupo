import {BrowserRouter, Routes, Route} from "react-router-dom"

import Inicio from "./pages/inicio/inicio.jsx"
import Segundo from "./pages/noticias/segundo.jsx"
import Login from './pages/login/login.jsx'
import Cadastro from "./pages/cadastro/cadastro.jsx"
import Politica from "./component/footer/adicionados/politicas.jsx"

export default function Navegacao (){

    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Inicio/>} />
            <Route path="/segundo" element={<Segundo/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/politica" element ={<Politica/>} />
        </Routes>
    </BrowserRouter>)

}
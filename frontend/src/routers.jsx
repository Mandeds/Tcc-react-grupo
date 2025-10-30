import {BrowserRouter, Routes, Route} from "react-router-dom"

import Inicio from "./pages/inicio/inicio.jsx"
import Segundo from "./pages/noticias/segundo.jsx"
import Login from './pages/login/login.jsx'
import Cadastro from "./pages/cadastro/cadastro.jsx"
import Politica from "./component/footer/adicionados/politicas.jsx"
import Naveg from "./pages/nav2/navegarPost/naveg.jsx"
import Perfil from "./pages/perfil/perfil.jsx"
import Sobre from "./pages/sobre/sobre.jsx"
import Postagem from "./pages/nav2/postagem/postar.jsx"


export default function Navegacao (){

    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Inicio/>} />
            <Route path="/segundo" element={<Segundo/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/politica" element ={<Politica/>} />
            <Route path="/Naveg" element = {<Naveg/>}/>
            <Route path="/perfil" element={<Perfil />}/>
            <Route path="/sobre" element ={<Sobre/>}/>  
            <Route path="/postar" element={<Postagem/>}/>
            <Route path="*" element ={<h1>Erro 404: Página não encontrada!</h1>} />
        </Routes>
    </BrowserRouter>)

}


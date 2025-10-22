import { Link } from "react-router-dom";
import "./naveg.scss"
import CabecalhoNav from "../../../component/cabecalhonav/cabecalhonav";

export default function Naveg (){

    return(
        <>
         <CabecalhoNav/>
         <div className="Lado1"></div>
            <div className="Main_naveg">

            </div>
            <div className="Lado2">
                
            </div>
        </>
    )
}
import './cardD.scss'
import {Link} from 'react-router-dom'

export default function CardD({texto, images}){
    return(
                    <>
                    {/*Cartoes para a pagina inicial*/}
                   <img src={images} />
                   <h3>{texto}</h3>
                    
                    </>
                
    )
}
import './cardD.scss'
import {Link} from 'react-router-dom'

export default function CardD({texto, images}){
    return(
                    <>
                    {/*Cartoes para a pagina inicial*/}
                   <div>
                    <img src={images} />
                   <p>{texto}</p>
                   </div>
                    
                    </>
                
    )
}
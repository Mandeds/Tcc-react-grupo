import './cardD.scss'
import { Link } from 'react-router-dom'

export default function CardD({ texto, images }) {
    return (
        <div className="card-container">
            {/* Cartões para a página inicial */}
            <img src={images} alt="Imagem do card" className="card-image" />
            <p className="card-text">{texto}</p>
        </div>
    )
}

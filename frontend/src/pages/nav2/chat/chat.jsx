import './chat.scss'

export default function Chat (){

  return(
    <>
    <div className="chat-Ladinho">
      <h1>Ola</h1>
      <button>Menu</button>
      <button>Pesquisa</button>
      <button>Inicio</button>
    </div>

    <div className="chat-meinho">
      <h1>Pão com ovo</h1>
      <div>
        <h1>Nome</h1>
      </div>

      <input 
      type="text" 
      placeholder='Digite sua mensagem'/>
    </div>

    <div className="Ladinho-usuario">
      <h1>Vai te lasca</h1>
    </div>
    </>
  )
}
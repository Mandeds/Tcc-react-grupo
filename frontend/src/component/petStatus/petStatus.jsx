import './petStatus.scss';

function PetStatus({ status, tipo }) {
  // status: 'perdido' ou 'adocao'
  // tipo: 'post' ou 'card' (onde será usado)

  const getStatusConfig = () => {
    if (status === 'perdido') {
      return {
        text: 'PERDIDO',
        color: '#FFC9C9', // Rosa claro
        borderColor: '#FF9999'
      };
    } else if (status === 'adocao') {
      return {
        text: 'PARA ADOÇÃO',
        color: '#FBF0B9', // Amarelo claro
        borderColor: '#F4D490'
      };
    }
    return null;
  };

  const config = getStatusConfig();
  if (!config) return null;

  return (
    <div className={`pet-status ${tipo} ${status}`}>
      <span className="status-text">{config.text}</span>
    </div>
  );
}

export default PetStatus;

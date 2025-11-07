import { useNavigate } from 'react-router-dom';
import './backButton.scss';

function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button className="back-button" onClick={handleBack}>
      ← Voltar
    </button>
  );
}

export default BackButton;

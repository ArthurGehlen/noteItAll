// Hooks
import { useEffect, useState } from "react";

// Utils
import "./Message.css";
// inicialmente estou considerando o tempo médio de 2 segundos para todas as situações, mas coloquei a possibilidade de mudar isso dependendo da situação
const Message = ({ message, type, time = 2000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  // top 5 coisas q vc consegue fazer com js :D
  useEffect(() => {
    if (!message) return;

    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, time);

    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className={`advice_message ${type}`}>
      <h2>{type == "error" ? "Erro" : "Sucesso"}</h2>

      <p>{message}</p>
    </div>
  );
};

export default Message;

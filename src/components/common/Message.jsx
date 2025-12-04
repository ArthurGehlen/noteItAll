// Hooks
import { useEffect, useState } from "react";

// Utils
import "./Message.css";

const Message = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  // top 5 coisas q vc consegue fazer com js :D
  useEffect(() => {
    if (!message) return;

    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

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

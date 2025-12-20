// Utils
import "./ContentComponent.css";

// criei este componente para englobar APENAS o conteúdo das páginas
// pelo design as páginas serão lineares, com algumas mudanças dentro desse componente
const ContentComponent = ({ children }) => {
  return <div className="content_component">{children}</div>;
};

export default ContentComponent;

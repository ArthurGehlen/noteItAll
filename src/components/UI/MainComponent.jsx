// Utils
import "./MainComponent.css";

// criei este componente para diminuir os códigos css das páginas :)
// ele engloba TODO o conteúdo da página
const MainComponent = ({ children }) => {
  return <div className="main_component">{children}</div>;
};

export default MainComponent;

// Utils
import "./ContentPage.css";

// criei este componente para diminuir os códigos css das páginas :)
const ContentPage = ({ children }) => {
  return <div className="content_page">{children}</div>;
};

export default ContentPage;

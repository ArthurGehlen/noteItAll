// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";

// Hooks
import { Link } from "react-router-dom";

// Images
import add_img from "../assets/add_img.svg";

// Components
import MainComponent from "../components/UI/MainComponent";
import ContentComponent from "../components/UI/ContentComponent";
import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";

function Home() {
  document.title = "NoteItAll - Home";

  const { profile } = useAuth();

  const check_hour = () => {
    const now = new Date().getHours();

    if (now >= 0 && now <= 12) {
      return "Bom dia";
    } else if (now >= 13 && now <= 16) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  const greetings = [
    `${check_hour()}, ${profile.username} 👋 pronto pra anotar umas ideias?`,
    "De volta? Bora bagunçar mais umas notas 😅",
    "Bem-vindo de volta! Suas ideias estavam com saudade (ou não).",
    "Pronto pra escrever algo que vai esquecer de ler depois?",
  ];

  return (
    <MainComponent>
      <Sidebar current_link="Home" />
      <ContentComponent>
        <Header />
        <div className="user_greetings_container">
          <p>{greetings[Math.floor(Math.random() * greetings.length)]}</p>
          <Link to="/my-notes">
            <img src={add_img} alt="Add" />
            <span>Nova nota</span>
          </Link>
        </div>
        <div className="home_favorites">
          <h2>Favoritos</h2>
          <div className="favorites_carrossel">
            {" "}
            {/* fazer um fetch mais tarde, não pretendo colocar aviso de "não há favoritos no momento" */}
            {/* <div className="home_favorite_card">
              <h3>Title</h3>
              <p> * limite de caracteres: 245 *
                Lorem ipsum dolor sit amet. Ut galisum ullam aut corporis
                voluptates et odit temporibus et fuga autem est earum nesciunt.
                Lorem ipsum dolor sit amet. Ut galisum ullam aut corporis
                voluptates et odit temporibus et fuga autem est earum nesciunt.
              </p>
            </div> */}
          </div>
        </div>
        <div className="statistics_wrapper">
          <h2>Estatísticas</h2>
          <div className="statistics_container">
            <div
              className="statistic_card"
              style={{ backgroundColor: "#3B82F6" }}
            >
              <h3>Quantidade de notas</h3>
              <p>{profile.notesCount}</p>
            </div>
            <div
              className="statistic_card"
              style={{ backgroundColor: "#FACC15" }}
            >
              <h3>Quantidade de favoritos</h3>
              <p>{profile.favoritesCount}</p>
            </div>
          </div>
        </div>
      </ContentComponent>
    </MainComponent>
  );
}

export default Home;

// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";

// Components
import MainComponent from "../components/UI/MainComponent";
import ContentComponent from "../components/UI/ContentComponent";
import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";

function Home() {
  document.title = "NoteItAll - Home";

  const { profile } = useAuth();

  return (
    <MainComponent>
      <Sidebar current_link="Home" />
      <ContentComponent>
        <Header />

        <div className="home_favorites">
          <h2>Favoritos</h2>
          <div className="favorites_carrossel"></div>
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

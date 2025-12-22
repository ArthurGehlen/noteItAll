// Utils
import "./css/Favorites.css";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";
import ContentComponent from "../components/UI/ContentComponent";
import Header from "../components/UI/Header";

const Favorites = () => {
  return (
    <MainComponent>
      <Sidebar current_link="Favoritos" />
      <ContentComponent>
        <Header />
      </ContentComponent>
    </MainComponent>
  );
};

export default Favorites;

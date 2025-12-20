// Utils
import "./css/Favorites.css";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";

const Favorites = () => {
  return (
    <MainComponent>
      <Sidebar current_link="Favoritos" />
    </MainComponent>
  );
};

export default Favorites;

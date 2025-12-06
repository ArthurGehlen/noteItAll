// Utils
import "./css/Favorites.css";

// Components
import ContentPage from "../components/UI/ContentPage";
import Sidebar from "../components/UI/Sidebar";

const Favorites = () => {
  return (
    <ContentPage>
      <Sidebar current_link="Favoritos" />
    </ContentPage>
  );
};

export default Favorites;

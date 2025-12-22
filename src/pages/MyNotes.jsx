// Utils
import "./css/MyNotes.css";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";
import Header from "../components/UI/Header";
import ContentComponent from "../components/UI/ContentComponent";

const MyNotes = () => {
  return (
    <MainComponent>
      <Sidebar current_link="Minhas Notas" />
      <ContentComponent>
        <Header />
      </ContentComponent>
    </MainComponent>
  );
};

export default MyNotes;

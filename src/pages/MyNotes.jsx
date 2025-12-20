// Utils
import "./css/MyNotes.css";

// Components
import MainComponent from "../components/UI/MainComponent";
import Sidebar from "../components/UI/Sidebar";

const MyNotes = () => {
  return (
    <MainComponent>
      <Sidebar current_link="Minhas Notas" />
    </MainComponent>
  );
}

export default MyNotes
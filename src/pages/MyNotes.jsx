// Utils
import "./css/MyNotes.css";

// Components
import ContentPage from "../components/UI/ContentPage";
import Sidebar from "../components/UI/Sidebar";

const MyNotes = () => {
  return (
    <ContentPage> 
        <Sidebar current_link="Minhas Notas" />
    </ContentPage>
  )
}

export default MyNotes
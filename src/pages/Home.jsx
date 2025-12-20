// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";

// Hooks
import { useState, useEffect } from "react";

// Components
import MainComponent from "../components/UI/MainComponent";
import ContentComponent from "../components/UI/ContentComponent";
import Sidebar from "../components/UI/Sidebar";

function Home() {
  document.title = "NoteItAll - Home";

  const { profile } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (profile && profile.username) {
      setUsername(profile.username); // talvez mudar isso aqui... não sei se faz sentido armazenar o username no useState
    }
  }, [profile]);

  return (
    <MainComponent>
      <Sidebar current_link="Home" />
      <ContentComponent>
        <p>aaaaaa</p>dasdasd
      </ContentComponent>
    </MainComponent>
  );
}

export default Home;

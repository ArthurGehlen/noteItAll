// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";

// Hooks
import { useState, useEffect } from "react";

// Components
import ContentPage from "../components/UI/ContentPage";
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
    <ContentPage>
      <Sidebar current_link="Home" />
    </ContentPage>
  );
}

export default Home;

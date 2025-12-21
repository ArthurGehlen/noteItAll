// Utils
import { useAuth } from "../context/AuthProvider";
import "./css/Home.css";

// Hooks
import { useState, useEffect, use } from "react";

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
  const [username, setUsername] = useState(null);

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
    `${check_hour()}, UserName 👋 pronto pra anotar umas ideias?`,
    "De volta? Bora bagunçar mais umas notas 😅",
    "Bem-vindo de volta! Suas ideias estavam com saudade (ou não).",
    "Pronto pra escrever algo que vai esquecer de ler depois?",
  ];

  useEffect(() => {
    if (profile && profile.username) {
      setUsername(profile.username); // talvez mudar isso aqui... não sei se faz sentido armazenar o username no useState
    }
  }, [profile]);

  return (
    <MainComponent>
      <Sidebar current_link="Home" />
      <ContentComponent>
        <Header />
        <div className="user_greetings_container">
          <p>{greetings[Math.floor(Math.random() * greetings.length)]}</p>{" "}
          {/* talvez fazer algo mais elaborado aqui. localStorage? */}
          <button>
            {" "}
            {/* mudar pra link */}
            <img src={add_img} alt="Add" />
            <span>Nova nota</span>
          </button>
        </div>
      </ContentComponent>
    </MainComponent>
  );
}

export default Home;

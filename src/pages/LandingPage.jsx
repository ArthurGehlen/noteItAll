// Utils
import "./css/LandingPage.css";
import "../styles/globals.css";
import "../styles/animations.css";

// Hooks
import { Link } from "react-router-dom";

// Images
import logo from "../assets/logo.svg";
import illustration from "../assets/illustration.png";
import github_icon from "../assets/github_icon.svg";
// Images - ItWorks
import itworks_groups from "../assets/itworks_groups.svg";
import itworks_note from "../assets/itworks_note.svg";
import itworks_organize from "../assets/itworks_organize.svg";
import itworks_ui from "../assets/itworks_ui.svg";
// Images - Roadmap
import checkmark from "../assets/checkmark.svg";
import coming_soon from "../assets/coming_soon.svg";

// Components
import BenefitCard from "../components/landingPage/BenefitCard";
import RoadmapCard from "../components/landingPage/RoadmapCard";
import RoadmapDivider from "../components/landingPage/RoadmapDivider";

const LandingPage = () => {
  return (
    <>
      <header className="landing_header">
        <div className="landing_logo">
          <img src={logo} alt="Logo" />
          <h1>NoteItAll</h1>
        </div>
        <div className="user_options">
          <button>Entrar</button>
          <button>Criar Conta</button>
        </div>
      </header>
      <div className="hero_section">
        <h2>Anote. Lembre. Viva sem esquecer</h2>

        <p>
          Organize suas ideias, tarefas e pensamenteos com rapidez e
          simplicidade
        </p>
        <button className="call_button">Comece agora - é grátis!</button>
      </div>
      <div className="benefits_wrapper">
        <h2>Funciona, sério</h2>

        <div className="benefits_container">
          <BenefitCard
            img={itworks_note}
            benefitTitle="Anote sem complicação"
            text="Sem anúncios, sem distrações. Só você e suas ideias bagunçadas."
            color="#8B5CF6"
          />
          <BenefitCard
            img={itworks_ui}
            benefitTitle="Interface Limpa"
            text="Sem anúncios, sem distrações. Só você e suas ideias bagunçadas."
            color="#F97316"
          />
          <BenefitCard
            img={itworks_organize}
            benefitTitle="Organize do seu jeito"
            text="Arrumadinho ou bagunçado? Tanto faz, o importante é encontrar depois… ou não."
            color="#06B6D4"
          />
          <BenefitCard
            img={itworks_groups}
            benefitTitle="Grupos"
            text="Faça grupos. Mais gente, mais bagunça (organizada)."
            color="#EF4444"
            commingSoon={true}
          />
        </div>
      </div>

      <div className="illustration">
        <img src={illustration} alt="Illustration" />
      </div>

      <div className="mini_roadmap_wrapper">
        <h2>Mini-roadmap</h2>
        <div className="mini_roadmap_container">
          <RoadmapCard color="#BFDBFE">
            <h2>Notas Individuais</h2>
            <img src={checkmark} alt="Checkmark" />
          </RoadmapCard>
          <RoadmapDivider />
          <RoadmapCard color="#FEF3C7">
            <header className="roadmap_card_header">
              <h2>Grupos</h2>
              <span className="roadmap_advisor">em breve</span>
            </header>
            <img src={coming_soon} alt="Checkmark" />
          </RoadmapCard>
          <RoadmapDivider />
          <RoadmapCard color="#BBF7D0">
            <header className="roadmap_card_header">
              <h2>Mobile App</h2>
              <span className="roadmap_advisor">talvez</span>
            </header>
            <p>?</p>
          </RoadmapCard>
        </div>

        <div className="call_to_action">
          <h2>Pronto para anotar tudo que passa pela sua cabeça?</h2>

          <button className="call_button">Criar conta Grátis</button>
        </div>
      </div>

      <footer className="landing_footer">
        <div className="infos_footer">
          <div className="landing_logo">
            <img src={logo} alt="Logo" />
            <h1>NoteItAll</h1>
          </div>
          <a href="https://github.com/ArthurGehlen/noteItAll" target="_blank">
            <img src={github_icon} alt="Github" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;

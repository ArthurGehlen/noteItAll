// Utils
import "./css/LandingPage.css";
import "../styles/globals.css"

// Images
import logo from "../assets/logo.svg";
// Images - ItWorks
import itworks_groups from "../assets/itworks_groups.svg";
import itworks_note from "../assets/itworks_note.svg";
import itworks_organize from "../assets/itworks_organize.svg";
import itworks_ui from "../assets/itworks_ui.svg";

// Components
import BenefitContainer from "../components/landingPage/BenefitContainer";

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

      {/* <div className="benefits_container">
        <h2>Funciona, sério</h2>

        <BenefitContainer
          img={itworks_note}
          benefitTitle="Anote sem complicação"
          text="Sem anúncios, sem distrações. Só você e suas ideias bagunçadas."
          color="#8B5CF6"
        />
        <BenefitContainer
          img={itworks_ui}
          benefitTitle="Interface Limpa"
          text="Sem anúncios, sem distrações. Só você e suas ideias bagunçadas."
          color="#F97316"
        />
        <BenefitContainer
          img={itworks_organize}
          benefitTitle="Organize do seu jeito"
          text="Arrumadinho ou bagunçado? Tanto faz, o importante é encontrar depois… ou não."
          color="#06B6D4"
        />
        <BenefitContainer
          img={itworks_groups}
          benefitTitle="Grupos"
          text="Faça grupos. Mais gente, mais bagunça (organizada)."
          color="#EF4444"
          commingSoon={true}
        />
      </div> */}
    </>
  );
};

export default LandingPage;

// Utils
import "./Header.css";
import { useAuth } from "../../context/AuthProvider";

const Header = () => {
  const { profile } = useAuth();

  if (!profile) return null; // verificação básica mas funcional :D

  return (
    <div className="header">
      {/* planejo colocar um botão de configuração no futuro, ja estou adiantando a estrutura */}
      <div className="user_area_header">
        <img src={profile.avatar} alt="Avatar" />
        <h2>{profile.username}</h2>
      </div>
    </div>
  );
};

export default Header;

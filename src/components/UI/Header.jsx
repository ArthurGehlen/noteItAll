// Utils
import "./Header.css";
import { useAuth } from "../../context/AuthProvider";

// Images
import user_without_avatar from "../../assets/user_without_avatar.svg";

const Header = () => {
  const { profile } = useAuth();

  if (!profile) return null; // verificação básica mas funcional :D

  return (
    <div className="header">
      {/* planejo colocar um botão de configuração no futuro, ja estou adiantando a estrutura */}
      <div className="user_area_header">
        {profile.avatar ? (
          <img src={profile.avatar} alt="Avatar" />
        ) : (
          <img
            src={user_without_avatar}
            alt="Avatar"
            style={{ maxWidth: "3.25rem" }}
          />
        )}
        <h2>{profile.username}</h2>
      </div>
    </div>
  );
};

export default Header;

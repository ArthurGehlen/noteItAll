// Utils
import "./Header.css";
import { useAuth } from "../../context/AuthProvider";
import greetings from "../../utils/greetings";

// Hooks
import { Link } from "react-router-dom";

// Images
import user_without_avatar from "../../assets/user_without_avatar.svg";
import add_img from "../../assets/add_img.svg";

const Header = ({ page, handle_click }) => {
  const { profile } = useAuth();

  if (!profile) return null; // verificação básica mas funcional :D

  return (
    <div className="header_wrapper">
      {/* planejo colocar um botão de configuração no futuro, ja estou adiantando a estrutura */}
      <div className="header">
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
      {profile.notesCount !== 0 && (
        <div className="user_greetings_container">
          <p>{greetings(profile.username)}</p>
          {page === "my-notes" ? (
            <button onClick={handle_click}>
              <img src={add_img} alt="Add" />
              <span>Nova nota</span>
            </button>
          ) : (
            <Link to="/my-notes">
              <img src={add_img} alt="Add" />
              <span>Nova nota</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

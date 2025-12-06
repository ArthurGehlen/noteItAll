// Hooks
import { Link } from "react-router-dom";

// Utils
import "./Sidebar.css";
import { useAuth } from "../../context/AuthProvider";

// Images
import logo from "../../assets/logo.svg";
// Images - Links
import home_icon from "../../assets/home_icon.svg";
import my_notes_icon from "../../assets/my_notes_icon.svg";
import favorites_icon from "../../assets/favorites_icon.svg";
import logout_icon from "../../assets/logout_icon.svg";

// criei isso pra ser um pouco mais organizado...
const links = [
  { id: 1, link_name: "Home", path: "/home", img: home_icon },
  { id: 2, link_name: "Minhas Notas", path: "/my-notes", img: my_notes_icon },
  { id: 3, link_name: "Favoritos", path: "/favorites", img: favorites_icon },
];

const Sidebar = ({ current_link }) => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <header className="sidebar_header">
        <div className="sidebar_logo">
          <img src={logo} alt="Logo" />
          <h2>NoteItAll</h2>
        </div>

        <ul className="sidebar_links">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                className={current_link == link.link_name ? "active_link" : ""}
              >
                {link.link_name} <img src={link.img} alt="Icon" />
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <button onClick={logout} className="logout">
        Logout
        <img src={logout_icon} alt="Icon" />
      </button>
    </div>
  );
};

export default Sidebar;

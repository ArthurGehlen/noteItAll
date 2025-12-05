// Hooks
import { Link } from "react-router-dom";

// Utils
import "./Sidebar.css";

// Images
import logo from "../../assets/logo.svg";

// criei isso pra ser um pouco mais organizado... pretendo colocar imagens nos links tmb
const links = [
  { id: 1, link_name: "Home", path: "/home" },
  { id: 2, link_name: "Minhas Notas", path: "/my-notes" },
  { id: 3, link_name: "Favoritos", path: "/favorites" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_logo">
        <img src={logo} alt="Logo" />
        <h2>NoteItAll</h2>
      </div>

      <ul className="sidebar_links">
        {links.map((link) => (
          <li key={link.id}>
            <Link to={link.path}>{link.link_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
